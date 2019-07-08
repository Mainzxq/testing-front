import React, { useContext, useReducer } from "react";
import axios from "axios";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { ASK_FOR_AUTH, ASK_FOR_LOGIN } from "../types";

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
    console.log(data);
    try {
      const res = await axios.post(
        // "http://106.13.7.75:3000/login",
        "http://localhost:3001/login",
        data,
        option
      );
      localStorage.setItem("token", res.data.token);
      dispatch({ type: ASK_FOR_LOGIN, payload: res });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <authContext.Provider
      value={{
        state,
        askForLogin
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
