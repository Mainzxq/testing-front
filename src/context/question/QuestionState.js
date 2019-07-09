import React, { useReducer } from "react";
import uuid from "uuid";
import questionContext from "./questionContext";
import questionReducer from "./questionReducer";
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
    questions: [
      {
        _id: "5d0f8b2134258e230fa51ed7",
        answered: true,
        id: "q-2-vfCo",
        type: "radio",
        title:
          "&lt;p&gt;本次考试题目单选题40个，每题1.5分，不定项选择题20个，每题2分，满分100分；可以进行多次考试，取最高分计入成绩，考试时间60分钟。&lt;/p&gt;\n",
        options: [
          {
            isRight: true,
            _id: "5d0f8b2134258e230fa51ed8",
            id: "o-101-FHJt",
            text: "&lt;p&gt;知道了&lt;/p&gt;\n"
          }
        ],
        craeteDate: "2019-06-23T14:22:25.032Z",
        __v: 0
      },

      // 2
      {
        _id: "5d0f8b2134258e230fa51ed9",
        answered: false,
        id: "q-1-iF62",
        type: "radio",
        title:
          "&lt;p&gt;本次考试题目单选题40个，每题1.5分，不定项选择题20个，每题2分，满分100分；可以进行多次考试，取最高分计入成绩，考试时间60分钟。&lt;/p&gt;\n",
        options: [
          {
            isRight: false,
            _id: "5d0f8b2134258e230fa51eda",
            id: "o-101-n9MY",
            text: "&lt;p&gt;知道了&lt;/p&gt;\n"
          }
        ],
        craeteDate: "2019-06-23T14:22:25.035Z",
        __v: 0
      },

      // 3
      {
        _id: "5d0f8b2134258e230fa51edb",
        answered: false,
        id: "q-3-dTAf",
        type: "radio",
        title:
          "&lt;p&gt;在联盟生产运维计算机中使用的账户密码，以下属于弱密码的是：&lt;/p&gt;\n",
        options: [
          {
            isRight: false,
            _id: "5d0f8b2134258e230fa51edf",
            id: "o-101-MdcX",
            text: "&lt;p&gt;3gynj2@J&lt;/p&gt;\n"
          },
          {
            isRight: false,
            _id: "5d0f8b2134258e230fa51ede",
            id: "o-102-03fQ",
            text: "&lt;p&gt;w@hxdlB&lt;/p&gt;\n"
          },
          {
            isRight: false,
            _id: "5d0f8b2134258e230fa51edd",
            id: "o-103-MSFF",
            text: "&lt;p&gt;DPns6600?&lt;/p&gt;\n"
          },
          {
            isRight: true,
            _id: "5d0f8b2134258e230fa51edc",
            id: "o-104-11Iz",
            text: "&lt;p&gt;Sccba123&lt;/p&gt;\n"
          }
        ],
        craeteDate: "2019-06-23T14:22:25.036Z",
        __v: 0
      }
    ]
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
      const res = await axios(
        `http://localhost:3001/question/title?keywords=${title}`,
        option
      );
      dispatch({ type: SEARCH_QUESTION_BY_TITLE, questions: res.data });
    } catch (err) {
      console.error(err);
    }
  };
  // update question
  const updateQuestion = question => {
    dispatch({ type: UPDATE_QUESTION, payload: question });
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
