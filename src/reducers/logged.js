import axios from "axios";
const token = localStorage.getItem("auth_token");

const loggedReducer = (
  state = {
    auth_token: token ? token : "",
  },
  action
) => {
  switch (action.type) {
    case "load/infoUser":
      if (action.auth_token) {
        const config = {
          method: "post",
          url: "http://localhost:8080/auth/info",
          headers: {
            Authorization: "Baerer " + action.auth_token,
          },
        };

        axios(config)
          .then(function (response) {
            const { user } = response.data;
            if(user){
                localStorage.setItem("auth_token", action.auth_token)
                return {...state, ...user}
            }
            else return {token: ""};
          })
          .catch(function (error) {
            return { ...state };
          });
      }
      else if (state.auth_token){
        const config = {
          method: "post",
          url: "http://localhost:8080/auth/info",
          headers: {
            Authorization: "Baerer " + state.auth_token,
          },
        };

        axios(config)
          .then(function (response) {
            const { user, error } = response.data;
            if(user){
                localStorage.setItem("auth_token", state.auth_token)
                return {...state, ...user}
            }
            else return {token: ""};
          })
          .catch(function (error) {
            return { ...state };
          });
      } 
      else {
        return { ...state };
      }
      return { ...state };
    default:
      return state;
  }
};

export default loggedReducer;
