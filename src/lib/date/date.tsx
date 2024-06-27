import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
import isoWeek from "dayjs/plugin/isoWeek.js";
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export const getMonday = (weekIdParam?: string) => {
  const monday = dayjs(weekIdParam).startOf("isoWeek");
  return monday;
};

export const fromWeekId = (weekId: string) => {
  return dayjs(weekId).startOf("isoWeek");
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

export const getWeekRelative = (isoDate: string) => {
  const diff = dayjs(isoDate).startOf("week").week() - dayjs().startOf("week").week();
  if (diff === 0) {
    return "Esta semana";
  } else if (diff === 1) {
    return "La semana que viene";
  } else if (diff > 1) {
    return `En ${diff} semanas`;
  } else if (diff === -1) {
    return "La semana pasada";
  } else {
    return `Hace ${Math.abs(diff)} semanas`;
  }
};

export const getDayName = (day: number) => {
  let dayName = dayjs()
    .isoWeekday(day + 1)
    .format("dddd");
  return dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase();
};

export const day2DayId = (day: string): "d0" | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" => {
  if (["0", "1", "2", "3", "4", "5", "6"].indexOf(day) === -1) {
    throw new Error(`Invalid day: ${day}`);
  }
  return `d${day as "0" | "1" | "2" | "3" | "4" | "5" | "6"}`;
};
