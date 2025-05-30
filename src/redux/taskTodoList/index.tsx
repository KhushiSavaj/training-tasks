interface Todo {
  id: number;
  newTodo: string;
  priority: string;
  completed: Boolean;
}

export type FilterValues = "all" | "active" | "completed";

interface IState {
  todos: Todo[];
  filterValues: FilterValues;
}

const localStorageGetItems = (key: string) => {
  if (typeof window !== "undefined") {
    const data: any = localStorage.getItem(key);
    const parseData = data ? JSON.parse(data) : null;
    return parseData;
  }
};

const localStorageSetItems = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, data);
    return data;
  }
};

export const initialState: IState = {
  todos: localStorageGetItems("todos") || [],
  filterValues: "all",
};

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_TODOS":
      return {
        ...state,
        todos: [
          ...state.todos,
          { ...action.payload, id: Date.now(), completed: false },
        ],
      };
    case "UPDATE_TODOS": {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    }
    case "SET_FILTER":
      return { ...state, filterValues: action.payload };
    case "CLEAR_COMPLETED":
      return { ...state, todos: state.todos.filter((todo) => !todo.completed) };
    case "DELETE_TODO": {
      const newTodoList = state?.todos?.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: newTodoList,
      };
    }
    case "LOCALSTORAGE_SET_ITEM":
      localStorageSetItems(
        action.payload.key,
        JSON.stringify(action.payload.data)
      );
      return state;
    default:
      return state;
  }
};
