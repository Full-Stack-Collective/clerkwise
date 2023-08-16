
export const capitalizeWord = (string: string | null): string | null => {
  if (!string || string.length < 1) return null;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-us', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
