const notificationMessageReducer = (
  state = {
    message: "",
  },
  action
) => {
  switch (action.type) {
    case "set/notificationMessage":
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export default notificationMessageReducer;
