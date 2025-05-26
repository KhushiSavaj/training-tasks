export const addUser = (payload: any) => {
  return { type: "ADD_USER", payload };
};

export const deleteUser = (id: number) => {
  return { type: "DELETE_USER", payload: id };
};

export const updateUser = (payload: any) => {
  return { type: "UPDATE_USER", payload };
};

export const searchUser = (value: string) => {
  return { type: "SEARCH_USER", payload: value };
};

export const localStorageSetData = (payload: any) => {
  return { type: "LOCALSTORAGE_SET_ITEM", payload };
};
