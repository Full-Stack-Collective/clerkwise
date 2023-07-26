export const retrievePersistentLocalStorageData = (key: string) => {
  const data =  localStorage.getItem(key);
  if (!data) {
    return;
  }
  return JSON.parse(data).state;
};
