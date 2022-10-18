const initialState = {
  incompletedTodo: [],
  completedTodo: [],
};
export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addTodo":
      return {
        ...state,
        incompletedTodo: helperFunction(state.incompletedTodo, action.payload),
      };
    case "movetocomplete":
      return moveHelper(state, action.payload);
    case "movetoincomplete":
      return moveHelper1(state, action.payload);
    case "update":
      return {
        ...state,
        incompletedTodo: updateHelper(state.incompletedTodo, action.payload),
      };
    case "delete":
      return deleteHelper(state, action.payload);
    default:
      return state;
  }
};
const helperFunction = (arr, data) => {
  const state_array = [...arr, data];
  return state_array;
};
const moveHelper = (arr, data) => {
  let curr_state = { ...arr };
  let incomplete = curr_state.incompletedTodo.filter(
    (item) => item.id !== data.id
  );
  return {
    incompletedTodo: [...incomplete],
    completedTodo: [...curr_state.completedTodo, data],
  };
};
const moveHelper1 = (arr, data) => {
  let curr_state = { ...arr };
  let complete = curr_state.completedTodo.filter((item) => item.id !== data.id);
  return {
    completedTodo: [...complete],
    incompletedTodo: [...curr_state.incompletedTodo, data],
  };
};
const updateHelper = (arr, data) => {
  const incomplete = [...arr];
  for (let i = 0; i < incomplete.length; i++) {
    if (incomplete[i].id === data.id) incomplete[i] = data;
  }
  return incomplete;
};
const deleteHelper = (arr, data) => {
  let incomplete = [...arr.incompletedTodo];
  let complete = [...arr.completedTodo];
  incomplete = incomplete.filter((item) => item.id !== data.id);
  complete = complete.filter((item) => item.id !== data.id);
  return {
    incompletedTodo: [...incomplete],
    completedTodo: [...complete],
  };
};
