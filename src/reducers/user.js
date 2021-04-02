const userReducer = (state = null, action) => {
  switch (action.type) {
    case "set/user":
      return { ...state, ...action.data };
    case "remove/user":
      localStorage.removeItem("token_seahorsechessapp");
      return null;
    default:
      return state === null ? null : {...state};
  }
};

export default userReducer;
