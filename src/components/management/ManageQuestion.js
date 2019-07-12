import React, { Fragment, useState, useContext } from "react";
import QuestionContext from "../../context/question/questionContext";
import QuestionItem from "../question/QuestionItem";
import MultiQuestion from "../question/MultiQuestion";
import { Grid, Button } from "@material-ui/core";

const ManageQestion = () => {
  const questionContext = useContext(QuestionContext);
  const { questions } = questionContext;
  const [state, setState] = useState({
    begins: 0,
    steps: 5,
    count: (questions && questions.length) || 0,
    pages: 0
  });

  const makeForward = () => {};

  return (
    <Fragment>
      <Grid container direction="column">
        <Grid item />
        {questions &&
          questions
            .slice(state.begins, state.steps)
            .map(question =>
              question.type === "radio" ? (
                <QuestionItem key={question.id} props={question} />
              ) : (
                <MultiQuestion key={question.id} props={question} />
              )
            )}
      </Grid>
      <Grid item>
        <Button>Previous</Button>
        <Button>Forward</Button>
      </Grid>
    </Fragment>
  );
};

export default ManageQestion;
