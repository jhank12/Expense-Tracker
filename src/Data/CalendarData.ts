export const monthsArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getMonthData(dateObj: {
  month: number;
  date: number;
  year: number;
}) {
  const { month, date: day, year } = dateObj;

  let prevMonthStart = new Date(`${monthsArr[month - 1]} 1, ${year}`);

  const currentMonthStart = new Date(`${monthsArr[month]} 1, ${year}`);

  let nextMonthStart = new Date(`${monthsArr[month + 1]} 1, ${year}`);

  if (month === 11) {
    nextMonthStart = new Date(`${monthsArr[0]} 1, ${year + 1}`);
  }

  if (month === 0) {
    prevMonthStart = new Date(`${monthsArr[11]} 1, ${year - 1}`);
  }

  const prevMonthDaysCount = Math.round(
    (currentMonthStart.getTime() - prevMonthStart.getTime()) / 86400000
  );

  const currentMonthDaysCount = Math.round(
    (nextMonthStart.getTime() - currentMonthStart.getTime()) / 86400000
  );

  return {
    prevMonthDaysCount: prevMonthDaysCount,
    currentMonthDaysCount: currentMonthDaysCount,
  };
}


export function formattedDate(dateObj): string {
  const { month, date, year } = dateObj;

  return `${monthsArr[month]} ${date}, ${year}`;
}