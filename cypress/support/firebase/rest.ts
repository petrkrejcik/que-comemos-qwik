import convertDocToFirestoreDoc from "../../../src/lib/firebase/convertObjToDoc";
import { DEFAULT_USER } from "../../fixtures/users";

export const getToken = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    ...DEFAULT_USER,
    returnSecureToken: true,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body,
  };

  try {
    const response = await fetch(
      `${
        Cypress.env("firebase").auth.host
      }/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        Cypress.env("firebase").appId
      }`,
      requestOptions
    );
    const result = await response.json();
    return result.idToken;
  } catch (error) {
    console.log("error", error);
  }
};
export const fetchFirestore = async (
  documentPath: string,
  options?: RequestInit
) => {
  const extraPathParam = options?.method === "DELETE" ? "emulator/" : "";
  const token = await getToken();
  return fetch(
    `${Cypress.env("firebase").firestore.host}/${extraPathParam}v1/projects/${
      Cypress.env("firebase").projectId
    }/databases/(default)/${documentPath}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...options,
    }
  );
};

export const addDocument = async (
  documentPath: string,
  document: object
): Promise<void> => {
  await fetchFirestore(`documents/${documentPath}`, {
    method: "POST",
    body: JSON.stringify(convertDocToFirestoreDoc(document)),
  });
};
