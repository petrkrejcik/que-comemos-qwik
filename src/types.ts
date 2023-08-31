export type Meal = {
  id: string;
  name: string;
  eatFor: "lunch" | "dinner" | "side-dish" | "";
  withSideDish?: boolean;
};
