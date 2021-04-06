const placesHorseReducer = (state = null, action) => {
    switch (action.type) {
      case "set/place":
        return { ...state, ...action.placeData };
      case "remove/place":
        return null;
      default:
        return state === null ? null : { ...state };
    }
  };
  
  export default placesHorseReducer;
  