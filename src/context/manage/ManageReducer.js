import { MANAGE_LOAD_DEFAULT_QUESTION, MANAGE_UPDATE_QUESTION } from "../types";

export default (state, action) => {
  switch (action.type) {
    case MANAGE_LOAD_DEFAULT_QUESTION:
      return {
        ...state,
        questionSlice: [...action.payload.questionSlice],
        pages: action.payload.pages,
        currentPage: action.payload.currentPage
      };
    case MANAGE_UPDATE_QUESTION:
      return state;
    default:
      return state;
  }
};
