import React, { useReducer } from "react";
import uuid from "uuid";
import questionContext from "./questionContext";
import questionReducer from "./questionReducer";
import setAuthToken from "../../utiles/setAuthToken";
import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  SEARCH_QUESTION,
  SEARCH_QUESTION_BY_TITLE,
  SEARCH_QUESTION_BY_TYPE,
  UPDATE_QUESTION
} from "../types";
import axios from "axios";

const QuestionState = props => {
  const initialState = {
    questions: []
  };

  const [state, dispatch] = useReducer(questionReducer, initialState);

  // search question by title
  const searchByTitle = async title => {
    const option = {
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "application/json",
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.get(
        `http://api.gosccba.cn/question/title?keywords=${title}`,
        option
      );
      dispatch({ type: SEARCH_QUESTION_BY_TITLE, questions: res.data });
    } catch (err) {
      console.error(err);
    }
  };
  // update question
  const updateQuestion = async question => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const option = {
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "application/json",
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.patch(
        `http://api.gosccba.cn/question/update/${question.id}`,
        question,
        option
      );
      console.log(res.data);
      dispatch({ type: UPDATE_QUESTION, payload: question, result: res.data });
    } catch (err) {
      console.error(err);
    }
    // dispatch({ type: UPDATE_QUESTION, payload: question });
  };

  const deleteQuestion = id => {
    dispatch({ type: DELETE_QUESTION, payload: id });
  };

  const createQuestion = question => {
    const id = uuid.v4();
    question.id = "q" + state.questions.length() + id;
    dispatch({ type: CREATE_QUESTION, payload: question });
  };
  // create question
  // delete question

  return (
    <questionContext.Provider
      value={{
        questions: state.questions,
        updateQuestion,
        deleteQuestion,
        createQuestion,
        searchByTitle
      }}
    >
      {props.children}
    </questionContext.Provider>
  );
};

export default QuestionState;
