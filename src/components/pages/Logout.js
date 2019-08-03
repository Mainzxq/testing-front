import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import authContext from "../../context/auth/authContext";

const Logout = () => {
  const { askForLogout } = useContext(authContext);
  return (
    <div>
      {askForLogout()}
      <Redirect to="/" />
    </div>
  );
};

export default Logout;
