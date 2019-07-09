import { ASK_FOR_AUTH, ASK_FOR_LOGIN } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ASK_FOR_LOGIN:
      return { ...state, token: action.payload, user: action.user, isAuthenticated:true };
    default:
      return state;
  }
};
