import React, { Fragment, useState, useContext, useEffect } from "react";
import QuestionContext from "../../context/question/questionContext";
import QuestionItem from "../question/QuestionItem";
import MultiQuestion from "../question/MultiQuestion";
import { Grid, Button } from "@material-ui/core";

const ManageQestion = () => {
  const questionContext = useContext(QuestionContext);
  const { questions, searchQuestion } = questionContext;
  const [state, setState] = useState({
    begins: 0,
    steps: 5,
    count: 0,
    pages: 0,
    current:1,
    loadQuestion: false
  });
  useEffect(() => {
    if (!state.loadQuestion) {
      searchQuestion();
    }
    return () => {
      //const pages = questions.length % state.steps

      setState({
        ...state,
        loadQuestion: true,
        count: questions.length,
        pages: parseInt(questions.length / 5) + 1
      });
    };
  }, [searchQuestion, questions]);
  const makeForward = () => {
    console.log(state);
    console.log(questions.length);
  };

  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
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
          <Button onClick={makeForward}>Forward</Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ManageQestion;
