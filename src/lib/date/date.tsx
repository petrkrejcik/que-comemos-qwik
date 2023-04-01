import dayjs, { Dayjs } from "dayjs";
// import weekOfYear from 'dayjs/plugin/weekOfYear.js';
// dayjs.extend(weekOfYear);

export const getWeek = (week: number | undefined = 0) => {
  const monday = dayjs()
    .startOf("week")
    .add(week * 7, "day");
  return monday;
};

export const fromWeekId = (weekId: string) => {
  return dayjs(weekId).startOf("week");
};

export const decrementWeek = (week: Dayjs, weeks: number | undefined = 1) => {
  return week.clone().subtract(weeks, "week");
};

export const incrementWeek = (week: Dayjs, weeks: number | undefined = 1) => {
  return week.clone().add(weeks, "week");
};

export const toWeekId = (week: Dayjs) => {
  return week.format("YYYY-MM-DD");
};
