import generateToken from "~/lib/firebase/generateToken";
import getConfig from "~/lib/firebase/getConfig";

interface FirestoreDoc {
  fields: {
    [key: string]: {
      [key: string]: any;
    };
  };
}

export default async (documentPath: string): Promise<FirestoreDoc> => {
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

  return data;
};
