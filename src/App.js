import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-noto-sans-sc";
// import "./App.css";

const App = () => {
  return (
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
  );
};

export default App;
