import { legacy_createStore as createStore } from "redux";
import {todoReducer} from "../Reducers/TodoReducer"

export const todoStore = createStore(todoReducer)