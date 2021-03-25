const loadingReducer = (
    state = {
      loading: true,
    },
    action
  ) => {
    switch (action.type) {
      case "switch/loading":
        return { ...state, loading: !state.loading };
      default:
        return state;
    }
  };
  
  export default loadingReducer;