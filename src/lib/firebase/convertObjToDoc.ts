import { FirestoreDocument } from "./types";

export default function convertDocToFirestoreDoc(doc: any) {
  const result: FirestoreDocument = {
    fields: {},
  };
  Object.entries(doc).forEach(([key, value]) => {
    if (typeof value === "string") {
      result.fields[key] = {
        stringValue: value,
      };
    } else if (typeof value === "number") {
      result.fields[key] = {
        integerValue: value.toString(),
      };
    } else if (typeof value === "boolean") {
      result.fields[key] = {
        booleanValue: value,
      };
    } else if (value === null) {
      result.fields[key] = {
        nullValue: null,
      };
    // } else if (Array.isArray(value)) {
    //   result.fields[key] = {
    //     arrayValue: {
    //       values: value.map((v) => convertDocToFirestoreDoc(v)),
    //     },
    //   };
    } else if (typeof value === "object") {
      result.fields[key] = {
        mapValue: convertDocToFirestoreDoc(value),
      };
    }
  });
  return result;
};
