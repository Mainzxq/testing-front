import {
  ASK_FOR_AUTH,
  ASK_FOR_LOGIN,
  ASK_FOR_USER,
  ASK_FOR_LOGOUT,
  LOGIN_ERR_MSG
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ASK_FOR_LOGIN:
      return {
        ...state,
        token: action.payload,
        user: action.user,
        isAuthenticated: true
      };
    case LOGIN_ERR_MSG:
      return {
        ...state,
        errorMsg: action.payload
      };
    case ASK_FOR_AUTH:
      return { ...state, isAuthenticated: action.isAuthenticated };
    case ASK_FOR_USER:
      return { ...state, user: action.payload };
    case ASK_FOR_LOGOUT:
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
};
