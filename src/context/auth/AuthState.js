import React, { useReducer } from "react";
import axios from "axios";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  ASK_FOR_AUTH,
  ASK_FOR_LOGIN,
  ASK_FOR_USER,
  ASK_FOR_LOGOUT,
  LOGIN_ERR_MSG
} from "../types";

const AuthState = props => {
  const initialState = {
    token: null,
    user: null,
    loading: null,
    isAuthenticated: null,
    errorMsg: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // 登陆验证
  const askForLogin = async data => {
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
      const res = await axios.post(
        // "http://106.13.7.75:3000/login",
        "http://api.gosccba.cn/login",
        data,
        option
      );
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: ASK_FOR_LOGIN,
          payload: res.data.token,
          user: res.data.user
        });
        return 0
      }
    } catch (err) {
      console.log(err.response.data.message)
      dispatch({
        type: LOGIN_ERR_MSG,
        payload: err.response.data.message
      });
      return -1
    }
  };

  const askForAuth = async token => {
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
        `http://api.gosccba.cn/users/auth/${token}`,
        option
      );

      if (res) {
        dispatch({ type: ASK_FOR_AUTH, isAuthenticated: true });
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
  };

  const askForUser = user => {
    dispatch({ type: ASK_FOR_USER, payload: user });
  };

  const askForLogout = () => {
    dispatch({ type: ASK_FOR_LOGOUT });
  };

  return (
    <authContext.Provider
      value={{
        state,
        errorMsg: state.errorMsg,
        isAuthenticated: state.isAuthenticated,
        askForLogin,
        askForAuth,
        askForUser,
        askForLogout
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
