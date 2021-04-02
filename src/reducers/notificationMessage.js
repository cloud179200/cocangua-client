/* eslint-disable no-loop-func */
const generateId = (messages) => {
  if (Array.isArray(messages)) {
    let randomId =
      Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    let check =
      [...messages].filter((message) => message.id === randomId).length > 0;
    while (check) {
      check =
        [...messages].filter((message) => message.id === randomId).length > 0;
      randomId = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    }
    return randomId;
  }
};
const notificationMessageReducer = (
  state = {
    messages: [],
  },
  action
) => {
  switch (action.type) {
    case "add/notificationMessage":
      const randomId = generateId(state.messages);
      const newMessages = [...state.messages];
      newMessages.push({
        id: randomId,
        content: action.content,
        error: action.error,
      });
      return {
        ...state,
        messages: newMessages,
      };
    case "remove/notificationMessage":
      const afterRemovedMessages = [...state.messages].filter(
        (message) => message.id !== action.id
      );
      return {
        ...state,
        messages: afterRemovedMessages,
      };
    default:
      return {...state};
  }
};

export default notificationMessageReducer;
