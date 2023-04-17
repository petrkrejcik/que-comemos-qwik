import generateToken from "~/lib/firebase/generateToken";
import getConfig from "~/lib/firebase/getConfig";

interface FirestoreDocument {
  fields: {
    [key: string]: FirestoreFieldValue;
  };
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

const convertFirestoreDocToObject = (doc: FirestoreDocument): ConvertedObject => {
  let result: ConvertedObject = {};
  if (!doc.fields) {
    return result;
  }
  Object.entries(doc.fields).forEach(([key, value]) => {
    if ('mapValue' in value) {
      result[key] = convertFirestoreDocToObject(value.mapValue);
    } else {
      const valueType = Object.keys(value)[0] as keyof FirestoreFieldValue;
      result[key] = value[valueType];
    }
  });
  return result;
};

export default async (documentPath: string): Promise<ConvertedObject> => {
  const { projectId } = getConfig();
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${documentPath}`;
  const token = await generateToken();
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Firestore document. Status code: ${response.status}`);
  }

  const data = await response.json();

  const result = convertFirestoreDocToObject(data);

  return result;
};
