export interface PlannedMeal {
  id: string;
  name: string;
  icon?: string;
  eatFor?: string;
}

interface Day {
  lunch: PlannedMeal;
  dinner: PlannedMeal;
  'lunch-side-dish': PlannedMeal;
  'dinner-side-dish': PlannedMeal;
}

export interface WeekPlan {
  d0?: Day;
  d1?: Day;
  d2?: Day;
  d3?: Day;
  d4?: Day;
  d5?: Day;
  d6?: Day;
  id?: string;
}
