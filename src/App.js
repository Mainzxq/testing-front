import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Logout from "./components/pages/Logout";
import ManageQuestion from "./components/management/ManageQuestion";
import CssBaseline from "@material-ui/core/CssBaseline";
import QuestionState from "./context/question/QuestionState";
import AuthState from "./context/auth/AuthState";
import ManageState from "./context/manage/ManageState";
import "typeface-noto-sans-sc";
import setAuthToken from "./utiles/setAuthToken";
// import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <QuestionState>
        <ManageState>
          <CssBaseline />
          <Router>
            <Navbar />
            <div style={{ fontFamily: "Noto Sans sc", marginTop: 16 }}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/manage" component={ManageQuestion} />
                <Route exact path="/logout" component={Logout} />
              </Switch>
            </div>
          </Router>
        </ManageState>
      </QuestionState>
    </AuthState>
  );
};

export default App;
