import { format, differenceInMinutes } from 'date-fns';

const StandardDateTimeFormat = 'M/dd/yyyy';

export const getTimePastIfLessThanDay = (compTime: Date | null): string => {
  if (!compTime) return '';

  const now = new Date();
  const diffInMinutes = differenceInMinutes(now, compTime);

  if (diffInMinutes > 24 * 60) {
    return format(compTime, StandardDateTimeFormat);
  }

  if (diffInMinutes > 60) {
    return Math.round(diffInMinutes / 60) + 'h ago';
  }

  return Math.round(diffInMinutes) + 'm ago';
};
