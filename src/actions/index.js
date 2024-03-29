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
export const updateUser = (dataToUpdate) => {
  return (dispatch) => {
    const { email, gender, avatar } = dataToUpdate;
    const token = localStorage.getItem("token_seahorsechessapp");
    if (token) {
      const data = JSON.stringify({
        token: token,
        email: email,
        gender: gender,
        avatar: avatar,
      });
      axios
        .post("/updateuser", data)
        .then((res) => {
          const { status, message } = res.data;
          if (status === "success") {
            dispatch(loadUser());
            dispatch(addNotificationMessage("Update success", false));
          }
          status === "error" && dispatch(addNotificationMessage(message, true));
        })
        .catch((error) => {
          dispatch(addNotificationMessage(error.message, true));
        });
    } else dispatch(addNotificationMessage("Update failed!", true));
  };
};
export const updateUserPassword = (dataToUpdate) => {
  return (dispatch) => {
    const { oldPassword, newPassword } = dataToUpdate;
    const token = localStorage.getItem("token_seahorsechessapp");
    if (token) {
      const data = JSON.stringify({
        token: token,
        old: oldPassword,
        new: newPassword,
      });
      axios
        .post("/updatepassword", data)
        .then((res) => {
          const { status, message } = res.data;
          console.log(res.data);
          status === "success" &&
            dispatch(addNotificationMessage(message, false));
          status === "error" && dispatch(addNotificationMessage(message, true));
        })
        .catch((error) => {
          dispatch(addNotificationMessage(error.message, true));
        });
    } else dispatch(addNotificationMessage("Update password failed!", true));
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
        .post("/getInfo", data)
        .then((res) => {
          const { status, message } = res.data;
          if (status !== "error") {
            dispatch(setUser({ ...res.data }));
          } else dispatch(addNotificationMessage(message, true));
        })
        .catch((error) => {
          localStorage.removeItem("token_seahorsechessapp");
          dispatch(addNotificationMessage(error.message, true));
        });
    } else {
      console.log(token);
      dispatch(addNotificationMessage("Signout success!", false));
      dispatch(removeUser());
    }
  };
};
export const setUser = (data) => {
  return {
    type: "set/user",
    data: data,
  };
};
export const removeUser = () => {
  return {
    type: "remove/user",
  };
};

export const setRoom = (data) => {
  return {
    type: "set/room",
    room: data,
  };
};
export const removeRoom = () => {
  return {
    type: "remove/room",
  };
};
export const createRoom = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token_seahorsechessapp");
    if (token) {
      const data = JSON.stringify({
        token: token,
      });
      axios
        .post("/createroom", data)
        .then((res) => {
          const { status, message, data } = res.data;
          if (status === "success") {
            dispatch(setRoom(data));
            dispatch(addNotificationMessage("Create room success", false));
          }
          status === "error" && dispatch(addNotificationMessage(message, true));
        })
        .catch((error) => {
          dispatch(addNotificationMessage(error.message, true));
        });
    } else dispatch(addNotificationMessage("Create room failed", true));
  };
};
export const joinRoom = (rid) => {
  return (dispatch) => {
    if (rid) {
      const token = localStorage.getItem("token_seahorsechessapp");
      const data = JSON.stringify({
        token: token,
        rid: rid,
      });
      axios
        .post("/joinroom", data)
        .then((res) => {
          //todo: get room info
          const { status, message, data } = res.data;
          console.log(data);
          if (status === "success") {
            dispatch(
              addNotificationMessage("Joined room:[" + data.roomId + "]", false)
            );
            dispatch(setRoom(data));
          }
          if (status === "error")
            dispatch(addNotificationMessage(message, true));
        })
        .catch((error) => {
          dispatch(addNotificationMessage(error.message, true));
        });
    }
  };
};
export const addPlace = (placeData) => {
  return {
    type: "set/place",
    placeData,
  };
};
