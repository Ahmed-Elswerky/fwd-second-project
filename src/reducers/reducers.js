export const users = (state = [], action) => {
  switch (action.type) {
    case "userChange":
      return action.value;
    default:
      return state;
  }
};
export const loggedIn = (state = "", action) => {
  switch (action.type) {
    case "loggedInChange":
      return action.value;
    default:
      return state;
  }
};
export const questions = (state = [], action) => {
  switch (action.type) {
    case "questionChange":
      return action.value;
    default:
      return state;
  }
};
