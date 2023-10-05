import { differenceInYears } from "date-fns";

const ONE_YEAR_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365;

export const calculateAge = (dateOfBirth: string) => {
  const dobInMilliseconds = Number(new Date(dateOfBirth));
  const now = Number(new Date());

 
  return differenceInYears(now, dobInMilliseconds)
};
