export const updateLocalStorage = (key, value) => {
  let tempObj = JSON.parse(localStorage.rankingData);
  let target = key;
  tempObj[target] = value;
  localStorage.rankingData = JSON.stringify(tempObj);
};
