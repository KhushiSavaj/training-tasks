import { createStore } from "redux";
import { todoReducer } from ".";

export const store = createStore(todoReducer);
