import dayjs, { Dayjs } from "dayjs";
// import weekOfYear from 'dayjs/plugin/weekOfYear.js';
// dayjs.extend(weekOfYear);

export const getMonday = (weekIdParam?: string) => {
  const monday = dayjs(weekIdParam).startOf("week");
  return monday;
};

export const fromWeekId = (weekId: string) => {
  return dayjs(weekId).startOf("week");
};

export const decrementWeek = (week: string, weeks: number | undefined = 1) => {
  return dayjs(week).subtract(weeks, "week");
};

export const incrementWeek = (week: string, weeks: number | undefined = 1) => {
  return dayjs(week).clone().add(weeks, "week");
};

export const toWeekId = (week: Dayjs) => {
  return week.format("YYYY-MM-DD");
};
