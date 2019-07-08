import React, { useContext, useReducer } from "react";
import axios from "axios";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { ASK_FOR_AUTH, ASK_FOR_LOGIN } from "../types";
import { async } from "q";

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
    const res = await axios.post("http://106.13.7.75:3000/login", data);
    console.log(res);
    dispatch({ type: ASK_FOR_LOGIN, payload: res });
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
