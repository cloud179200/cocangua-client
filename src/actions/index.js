import axios from "../shared/axios/axios";

export const switchSound = {
  type: "switch/sound",
};
export const switchMusic = {
  type: "switch/music",
};
export const addNotificationMessage = (content, error) => {
  return {
    type: "add/notificationMessage",
    content: content,
    error: error,
  };
};
export const removeNotificationMessage = (id) => {
  return {
    type: "remove/notificationMessage",
    id: id,
  };
};
export const loadUser = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token_seahorsechessapp");
    if (token) {
      const data = JSON.stringify({
        token: token,
      });
      axios
        .post("api/getInfo", data)
        .then((res) => {
          const data = res.data;
          if (data.id) {
            dispatch(setUser({ ...res.data }));
          }
        })
        .catch((error) => {
          dispatch(setUser(null));
          localStorage.removeItem("token_seahorsechessapp");
        });
    }
  };
};
export const setUser = (data) => {
  return {
    type: "set/user",
    data: data,
  };
};
