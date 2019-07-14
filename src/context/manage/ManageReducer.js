import { MANAGE_LOAD_DEFAULT_QUESTION } from "../types";

export default (state, action) => {
  switch (action.type) {
    case MANAGE_LOAD_DEFAULT_QUESTION:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
