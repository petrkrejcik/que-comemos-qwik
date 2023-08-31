import { DocumentReference } from "firebase/firestore";
import generateToken from "~/lib/firebase/generateToken";
import getConfig from "~/lib/firebase/getConfig";

export interface FirestoreDocument {
  name?: string;
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

type StructuredQuery = {
  select?: {
    fields: { fieldPath: string }[];
  };
  from: { collectionId: string }[];
  where?: {
    fieldFilter: {
      field: { fieldPath: string };
      op: "EQUAL" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL";
      value: FirestoreFieldValue;
    }
  };
}

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
    // console.error(`Error when fetching Firestore document from url ${url}`);
    // console.error(e);
    throw e;
  }
};

export const getDocument = async <T = ConvertedObject>(documentPath: string): Promise<T> => {
  const data = await fetchFirestore(`documents/${documentPath}`);
  const result = convertFirestoreDocToObject<T>(data);
  return result;
};

export const getCollection = async <T = ConvertedObject>(
  documentPath: string,
  options: { filters?: Record<string, unknown> } = {}
): Promise<T[]> => {
  let path = `documents/${documentPath}?pageSize=1000&orderBy=name`;
  if (options.filters) {
    path += `&filters=${encodeURIComponent(JSON.stringify({ fieldFilter: options.filters }))}`;
  }
  const data = await fetchFirestore<FirestoreCollection>(path);
  // encodeURIComponent('{"fieldFilter": {"field": {"fieldPath": "fieldName"}, "op": "EQUAL", "value": "desiredValue"}}')}`);
  const result = data.documents.map((doc) => {
    const id = doc.name?.split("/").pop();
    return convertFirestoreDocToObject<T>(doc, id);
  });
  return result;
};

export const updateDocument = async (documentPath: string, document: object): Promise<void> => {
  await fetchFirestore(`documents/${documentPath}`, {
    method: "PATCH",
    body: JSON.stringify(document),
  });
};

export const addDocument = async (documentPath: string, document: object): Promise<void> => {
  await fetchFirestore(`documents/${documentPath}`, { method: "POST", body: JSON.stringify(document) });
};

export const query = async <T = ConvertedObject>(documentPath: string, structuredQuery: StructuredQuery): Promise<T[]> => {
  const documents = await fetchFirestore<{document: FirestoreDocument}[]>(`documents/${documentPath}:runQuery`, { method: "POST", body: JSON.stringify({structuredQuery}) });
  return documents.map(({document}) => {
    const id = document.name?.split("/").pop();
    return convertFirestoreDocToObject(document, id);
  })
};
