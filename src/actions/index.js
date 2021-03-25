export const switchSound = {
  type: "switch/sound",
};
export const switchMusic = {
  type: "switch/music",
};
export const setNotificationMessage = (message) => {
  return{
    type: "set/notificationMessage",
    message: message
  }
}
export const loadInfoUser = (token = undefined) => {
  return{
    type: "load/infoUser",
    auth_token: token
  }
}
export const switchLoading  = () => {
  return{
    type: "switch/loading"
  }
}
