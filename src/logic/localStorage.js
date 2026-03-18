function saveListToStorage(listName, list) {
  localStorage.setItem(listName, JSON.stringify(list));
}

function getListFromStorage(listName) {
  if (!localStorage.getItem(listName)) {
    saveListToStorage(listName, []);
  }

  return JSON.parse(localStorage.getItem(listName));
}

export { saveListToStorage, getListFromStorage };
