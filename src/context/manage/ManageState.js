import React, { useReducer } from "react";
import ManageReducer from "./ManageReducer";
import manageContext from "./manageContext";
import setAuthToken from "../../utiles/setAuthToken";
import axios from "axios";
import { MANAGE_LOAD_DEFAULT_QUESTION, MANAGE_UPDATE_QUESTION } from "../types";

const ManageState = props => {
  const initialState = {
    questionSlice: [],
    steps: 0,
    currentPage: 0,
    pages: 0,
    type: ""
  };

  const [state, dispatch] = useReducer(ManageReducer, initialState);

  // 加载默认页
  const loadDefaultQuestion = async item => {
    if (!item) {
      item = {
        currentPage: 0,
        steps: 5,
        type: ""
      };
    }
    try {
      const res = await axios.get(
        `http://api.gosccba.cn/question/slice?currentPage=${
          item.currentPage
        }&steps=${item.steps}&type=${item.type}`
      );
      console.log("加载成功", res.data);
      dispatch({ type: MANAGE_LOAD_DEFAULT_QUESTION, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };
  // 向后一页
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
      dispatch({
        type: MANAGE_UPDATE_QUESTION,
        payload: question,
        result: res.data
      });
    } catch (err) {
      console.error(err);
    }
    // dispatch({ type: UPDATE_QUESTION, payload: question });
  };
  return (
    <manageContext.Provider
      value={{
        state,
        loadDefaultQuestion,
        updateQuestion
      }}
    >
      {props.children}
    </manageContext.Provider>
  );
};

export default ManageState;
