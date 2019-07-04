import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  SEARCH_QUESTION,
  SEARCH_QUESTION_BY_TITLE,
  SEARCH_QUESTION_BY_TYPE,
  UPDATE_QUESTION
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case UPDATE_QUESTION:
      const newQuestions = state.questions;
      newQuestions.map(que => {
        if (action.payload.id === que.id) {
          que = action.payload;
          console.log(que);
        }
      });
      return {
        ...state,
        questions: newQuestions
      };
    default:
      return state;
  }
};
