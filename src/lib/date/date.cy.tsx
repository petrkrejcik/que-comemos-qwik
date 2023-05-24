import dayjs, { Dayjs } from "dayjs";
import { getMonday, toWeekId } from "~/lib/date/date";

describe("Date utils", () => {
  it("getMonday works", () => {
		expect(getMonday('01-01-2024').toISOString()).equal('2024-01-01T00:00:00.000Z')
		expect(getMonday('01-02-2024').toISOString()).equal('2024-01-01T00:00:00.000Z')
		expect(getMonday('01-08-2024').toISOString()).equal('2024-01-08T00:00:00.000Z')
  });
  
  it("toWeekId works", () => {
		expect(toWeekId(dayjs('2024-01-01T00:00:00.000Z'))).equal('2024-01-01')
		expect(toWeekId(dayjs('2024-01-02T00:00:00.000Z'))).equal('2024-01-02')
		expect(toWeekId(dayjs('2024-01-08T00:00:00.000Z'))).equal('2024-01-08')
  });
});
