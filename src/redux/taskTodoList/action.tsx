export const addTodos = (payload: any) => {
  return { type: "ADD_TODOS", payload };
};

export const updateTodos = (id: any) => ({
  type: "UPDATE_TODOS",
  payload: id,
});

export const setFilter = (filterValues: string) => {
  return { type: "SET_FILTER", payload: filterValues };
};

export const clearComplete = () => {
  return { type: "CLEAR_COMPLETED" };
};

export const deleteTodo = (id: number) => {
  return { type: "DELETE_TODO", payload: id };
};

export const localStorageSetData = (payload: any) => {
  return { type: "LOCALSTORAGE_SET_ITEM", payload };
};
