import { DocumentReference } from "firebase/firestore";
import generateToken from "~/lib/firebase/generateToken";
import getConfig from "~/lib/firebase/getConfig";

interface FirestoreDocument {
  name: string;
  fields: {
    [key: string]: FirestoreFieldValue;
  };
}

interface FirestoreCollection {
  documents: FirestoreDocument[];
}

type FirestoreFieldValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { arrayValue: { values: FirestoreFieldValue[] } }
  | { mapValue: FirestoreDocument };

type ConvertedObject = {
  [key: string]: any;
};

const convertFirestoreDocToObject = <T = ConvertedObject>(doc: FirestoreDocument, id?: string): T => {
  let result: ConvertedObject = {
    ...(id && { id }),
  };
  if (!doc.fields) {
    return result as T;
  }
  Object.entries(doc.fields).forEach(([key, value]) => {
    if ("mapValue" in value) {
      result[key] = convertFirestoreDocToObject(value.mapValue);
    } else {
      const valueType = Object.keys(value)[0] as keyof FirestoreFieldValue;
      result[key] = value[valueType];
    }
  });
  return result as T;
};

const getHost = () => {
  if (import.meta.env.DEV && !import.meta.env.VITE_DISABLE_FIREBASE_EMULATORS) {
    return "http://127.0.0.1:8080";
  } else {
    return "https://firestore.googleapis.com";
  }
};

export const fetchFirestore = async <T = FirestoreDocument>(path: string, options?: RequestInit): Promise<T> => {
  const { projectId } = getConfig();
  const url = `${getHost()}/v1/projects/${projectId}/databases/(default)/${path}`;
  console.log("🛎 ", "url", url);
  const token = await generateToken();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Firestore document. Status code: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.error(`Error when fetching Firestore document from url ${url}`);
    console.error(e);
    throw e;
  }
};

export const getDocument = async <T = ConvertedObject>(documentPath: string): Promise<T> => {
  const data = await fetchFirestore(`documents/${documentPath}`);
  const result = convertFirestoreDocToObject<T>(data);
  return result;
};

export const getCollection = async <T = ConvertedObject>(documentPath: string): Promise<T[]> => {
  const data = await fetchFirestore<FirestoreCollection>(`documents/${documentPath}`);
  const result = data.documents.map((doc) => {
    const id = doc.name.split("/").pop();
    return convertFirestoreDocToObject<T>(doc, id);
  });
  return result;
};

// A REST API call to save a document to Firestore

export const saveDocument = async (documentPath: string, document: object): Promise<void> => {
  const data = await fetchFirestore(`documents/${documentPath}`, { method: "PATCH", body: JSON.stringify(document) });
  console.log("🛎 ", "data", data);
};