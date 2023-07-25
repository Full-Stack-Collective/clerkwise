export const retrievePersistentLocalStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) throw Error('No state saved to local storage');

  return JSON.parse(data).state;
};
