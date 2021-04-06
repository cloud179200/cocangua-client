const roomReducer = (state = null, action) => {
  switch (action.type) {
    case "set/room":
      return {...action.room};
    case "remove/room":
      return null;
    default:
      return state === null ? null : {...state};
  }
};

export default roomReducer;
