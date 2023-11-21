export interface FirestoreDocument {
  name?: string;
  fields: {
    [key: string]: FirestoreFieldValue;
  };
}

export interface FirestoreCollection {
  documents: FirestoreDocument[];
}

export type FirestoreFieldValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { arrayValue: { values: FirestoreFieldValue[] } }
  | { mapValue: FirestoreDocument };

export type ConvertedObject = {
  [key: string]: any;
};

export type StructuredQuery = {
  select?: {
    fields: { fieldPath: string }[];
  };
  from: { collectionId: string }[];
  where?: {
    fieldFilter: {
      field: { fieldPath: string };
      op: "EQUAL" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL";
      value: FirestoreFieldValue;
    };
  };
  orderBy?: {
    field: { fieldPath: string };
  }[];
};
