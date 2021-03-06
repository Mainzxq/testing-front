import React, { useContext, useState } from "react";
// import "materialize-css/dist/css/materialize.min.css";
// import "material-design-icons/iconfont/material-icons.css";
// import M from "materialize-css/dist/js/materialize.min.js";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import ManageContext from "../../context/manage/manageContext";
import QuestionItem from "../question/QuestionItem";
// import QuestionItem from "./QuestionItem";
// import MultiQuestion from "../question/MultiQuestion";
import { Grid, Button, Typography, Divider } from "@material-ui/core";
import AuthContext from "../../context/auth/authContext";
// import FloatBtn from "../layout/FloatBtn";
const userStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  container: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const ManageQestion = () => {
  const manageContext = useContext(ManageContext);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const { loadDefaultQuestion, state } = manageContext;
  const classes = userStyles();
  // const { questionSlice, pages, currentPage, steps } = state;
  useState(() => {
    loadDefaultQuestion();
    // M.AutoInit();
  });
  // const [states, setStates] = useState(state);

  const makeForward = () => {
    let item = state;
    if (item.currentPage < state.pages) {
      item.currentPage = state.currentPage + 1;
      item.type = "";
    }

    loadDefaultQuestion(item);
  };
  const makePrevious = () => {
    let item = state;
    if (item.currentPage <= state.pages && item.currentPage !== 0) {
      item.currentPage = state.currentPage - 1;
      item.type = "";
    }

    loadDefaultQuestion(item);
  };

  return isAuthenticated ? (
    <div className={classes.root}>
      <Container>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            <Typography>管理问题</Typography>
          </Grid>
          <Grid item>
            {state.questionSlice.map(question => (
              <QuestionItem key={question.id} props={question} />
            ))}
          </Grid>
        </Grid>

        <Divider style={{ marginTop: 16 }} />
        <div
          style={{
            width: 180,
            height: 60,
            textAlign: "center",
            margin: "auto",
            marginTop: 16,
            marginBottom: 32
          }}
        >
          <Button onClick={makePrevious} style={{ float: "left" }}>
            {"<<<"}
          </Button>
          <span style={{ float: "left" }}>
            <Typography variant="h6" style={{ fontSize: 18, paddingTop: 4 }}>
              {state.currentPage}/{state.pages}
            </Typography>
          </span>
          <Button onClick={makeForward} style={{ float: "left" }}>
            {">>>"}
          </Button>
        </div>
      </Container>
      {/* <FloatBtn /> */}
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default ManageQestion;
