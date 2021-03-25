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
