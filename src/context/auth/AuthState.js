import React, { useReducer } from "react";
import axios from "axios";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  ASK_FOR_AUTH,
  ASK_FOR_LOGIN,
  ASK_FOR_USER,
  ASK_FOR_LOGOUT
} from "../types";

const AuthState = props => {
  const initialState = {
    token: null,
    user: null,
    loading: null,
    isAuthenticated: null
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
        "http://10.199.172.142:3001/login",
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
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const askForAuth = tokens => {
    dispatch({ type: ASK_FOR_AUTH, token: tokens });
  };

  const askForUser = user => {
    dispatch({ type: ASK_FOR_USER, payload: user });
  };

  const askForLogout = () => {
    dispatch({type: ASK_FOR_LOGOUT})
  }

  return (
    <authContext.Provider
      value={{
        state,
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
