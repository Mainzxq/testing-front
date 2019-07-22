import React, { Fragment, useContext, useState } from "react";
import ManageContext from "../../context/manage/manageContext";
import QuestionItem from "./QuestionItem";
import MultiQuestion from "../question/MultiQuestion";
import { Grid, Button, Typography, Divider } from "@material-ui/core";
import ListMenu from "./ListMenu";
import AuthContext from '../../context/auth/authContext'

const ManageQestion = () => {
  const manageContext = useContext(ManageContext);
  const authContext = useContext(AuthContext)
  const { isAuthenticated } = authContext
  const { loadDefaultQuestion, state } = manageContext;
  // const { questionSlice, pages, currentPage, steps } = state;
  useState(() => {
    loadDefaultQuestion();
  });
  // const [states, setStates] = useState(state);

  // useEffect(() => {
  //   setStates(state);
  //   console.log(states);
  // }, []);

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
    if (item.currentPage < state.pages && item.currentPage !== 0) {
      item.currentPage = state.currentPage - 1;
      item.type = "";
    }

    loadDefaultQuestion(item);
  };

  return (
    <Fragment>
      <Grid container direction="row" alignItems="flex-start">
        <Grid item xs>
          {isAuthenticated?<ListMenu  />:""}
        </Grid>
        <Grid item xs={6}>

          {isAuthenticated?<Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ overflow: "hidden" }}
          >
            <Grid item>
              {state.questionSlice.map(question =>
                question.type === "radio" ? (
                  <QuestionItem key={question.id} props={question} />
                ) : (
                  <MultiQuestion key={question.id} props={question} />
                )
              )}
            </Grid>

            <Grid item>
              <Divider style={{ marginTop: 16 }} />
              <Button
                onClick={makePrevious}
                style={{ overflow: "Hidden", float: "left", margin: 4 }}
              >
                {"<<<"}
              </Button>
              <span style={{ overflow: "Hidden", float: "left", margin: 4 }}>
                <Typography
                  variant="h6"
                  style={{ fontSize: 18, paddingTop: 4 }}
                >
                  {state.currentPage}/{state.pages}
                </Typography>
              </span>
              <Button
                onClick={makeForward}
                style={{ overflow: "Hidden", float: "left", margin: 4 }}
              >
                {">>>"}
              </Button>
            </Grid>
          </Grid>: <Typography variant="h2" component="h1" style={{textAlign:"center", marginTop: 160}}>403 出错了，请先登录！</Typography>}
        </Grid>
        <Grid item xs />
      </Grid>
    </Fragment>
  );
};

export default ManageQestion;
