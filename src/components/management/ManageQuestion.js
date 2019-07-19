import React, { Fragment, useContext, useEffect, useState } from "react";
import ManageContext from "../../context/manage/manageContext";
import QuestionItem from "./QuestionItem";
import MultiQuestion from "../question/MultiQuestion";
import { Grid, Button, Typography } from "@material-ui/core";

const ManageQestion = () => {
  const manageContext = useContext(ManageContext);
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

  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          {console.log(state.questionSlice)}
          {state.questionSlice.map(question =>
            question.type === "radio" ? (
              <QuestionItem key={question.id} props={question} />
            ) : (
              <MultiQuestion key={question.id} props={question} />
            )
          )}
        </Grid>

        <Grid item>
          <Button>Previous</Button>
          <span>
            <Typography variant="h6">
              {state.currentPage}/{state.pages}
            </Typography>
          </span>
          <Button onClick={makeForward}>Forward</Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ManageQestion;
