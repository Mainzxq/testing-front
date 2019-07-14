import React, { Fragment, useContext, useEffect } from "react";
import ManageContext from "../../context/manage/manageContext";
import QuestionItem from "../question/QuestionItem";
import MultiQuestion from "../question/MultiQuestion";
import { Grid, Button } from "@material-ui/core";
import axios from "axios";

const ManageQestion = () => {
  const manageContext = useContext(ManageContext);
  const { loadDefaultQuestion, state } = manageContext;
  const { questionSlice, pages, currentPage, steps } = state;

  useEffect(() => {
    loadDefaultQuestion();
    return () => {};
  });
  const makeForward = () => {
    console.log(state);
    console.log(questionSlice.length);
  };

  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          {questionSlice &&
            questionSlice.map(question =>
              question.type === "radio" ? (
                <QuestionItem key={question.id} props={question} />
              ) : (
                <MultiQuestion key={question.id} props={question} />
              )
            )}
        </Grid>

        <Grid item>
          <Button>Previous</Button>
          <Button onClick={makeForward}>Forward</Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ManageQestion;
