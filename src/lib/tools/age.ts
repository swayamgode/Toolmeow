export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  dayOfWeek: string;
  nextBirthdayDays: number;
  nextBirthdayDate: string;
  isLeapYearBirth: boolean;
  leapNote?: string;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

function addYearsToBirth(birthDate: Date, yearsToAdd: number): Date {
  const d = new Date(birthDate.getTime());
  const origDay = birthDate.getUTCDate();
  const targetYear = birthDate.getUTCFullYear() + yearsToAdd;
  const targetMonth = birthDate.getUTCMonth();
  d.setUTCFullYear(targetYear, targetMonth, 1);
  const maxDays = getDaysInMonth(targetYear, targetMonth);
  d.setUTCDate(Math.min(origDay, maxDays));
  return d;
}

function addMonthsToAnchor(anchorDate: Date, origDay: number, monthsToAdd: number): Date {
  const d = new Date(anchorDate.getTime());
  const targetMonth = anchorDate.getUTCMonth() + monthsToAdd;
  d.setUTCMonth(targetMonth, 1);
  const maxDays = getDaysInMonth(d.getUTCFullYear(), d.getUTCMonth());
  d.setUTCDate(Math.min(origDay, maxDays));
  return d;
}

export function calculateAge(dobStr: string, asOfStr?: string): AgeResult {
  const [bYear, bMonth, bDay] = dobStr.split('-').map(Number);
  const birthDate = new Date(Date.UTC(bYear, bMonth - 1, bDay));

  let targetDate: Date;
  if (asOfStr) {
    const [tYear, tMonth, tDay] = asOfStr.split('-').map(Number);
    targetDate = new Date(Date.UTC(tYear, tMonth - 1, tDay));
  } else {
    const now = new Date();
    targetDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  }

  if (targetDate.getTime() < birthDate.getTime()) {
    throw new Error('Date of birth cannot be in the future relative to the target date.');
  }

  const origBirthDay = birthDate.getUTCDate();

  // 1. Advance full years from birth
  let years = 0;
  while (true) {
    const nextYear = addYearsToBirth(birthDate, years + 1);
    if (nextYear.getTime() <= targetDate.getTime()) {
      years++;
    } else {
      break;
    }
  }

  const yearAnchor = addYearsToBirth(birthDate, years);

  // 2. Advance full months from year anchor
  let months = 0;
  while (true) {
    const nextMonth = addMonthsToAnchor(yearAnchor, origBirthDay, months + 1);
    if (nextMonth.getTime() <= targetDate.getTime()) {
      months++;
    } else {
      break;
    }
  }

  const monthAnchor = addMonthsToAnchor(yearAnchor, origBirthDay, months);

  // 3. Remaining days
  const remainingMs = targetDate.getTime() - monthAnchor.getTime();
  const days = Math.round(remainingMs / (1000 * 60 * 60 * 24));

  // Total statistics
  const diffMs = targetDate.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;
  const totalMonths = years * 12 + months;

  // Day of week born
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[birthDate.getUTCDay()];

  // Leap birth calculation
  const isLeapBirth = birthDate.getUTCMonth() === 1 && birthDate.getUTCDate() === 29;
  let leapNote: string | undefined;

  // Next birthday calculation
  let nextBdayYear = targetDate.getUTCFullYear();
  const nextBdayMonth = birthDate.getUTCMonth();
  let nextBdayDay = birthDate.getUTCDate();

  if (isLeapBirth && !isLeapYear(nextBdayYear)) {
    nextBdayDay = 28;
    leapNote = 'Observed on Feb 28 in non-leap years';
  }

  let nextBday = new Date(Date.UTC(nextBdayYear, nextBdayMonth, nextBdayDay));
  if (nextBday.getTime() < targetDate.getTime()) {
    nextBdayYear += 1;
    if (isLeapBirth && !isLeapYear(nextBdayYear)) {
      nextBdayDay = 28;
    } else if (isLeapBirth && isLeapYear(nextBdayYear)) {
      nextBdayDay = 29;
    }
    nextBday = new Date(Date.UTC(nextBdayYear, nextBdayMonth, nextBdayDay));
  }

  const nextBdayDiffMs = nextBday.getTime() - targetDate.getTime();
  const nextBirthdayDays = Math.round(nextBdayDiffMs / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    dayOfWeek,
    nextBirthdayDays,
    nextBirthdayDate: nextBday.toISOString().split('T')[0],
    isLeapYearBirth: isLeapBirth,
    leapNote,
  };
}
