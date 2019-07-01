import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import CssBaseline from "@material-ui/core/CssBaseline";
import QuestionState from "./context/question/QuestionState";
import "typeface-noto-sans-sc";
// import "./App.css";

const App = () => {
  return (
    <QuestionState>
      <Router>
        <Fragment>
          <CssBaseline />
          <Navbar />
          <div style={{ fontFamily: "Noto Sans sc", marginTop: 8 }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </QuestionState>
  );
};

export default App;
