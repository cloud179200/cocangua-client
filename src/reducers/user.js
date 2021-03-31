const userReducer = (state = null, action) => {
  switch (action.type) {
    case "set/user":
      return { ...state, ...action.data };
    default:
      return null;
  }
};

export default userReducer;
