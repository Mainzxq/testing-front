import React, { Fragment, useContext } from "react";
import QuestionContext from "../../context/question/questionContext";

const Question = () => {
  const questionContext = useContext(QuestionContext);
  const { questions } = questionContext;
  return (
    <Fragment>
      {questions.map(question => (
        <h3>{question.title}</h3>
      ))}
    </Fragment>
  );
};

export default Question;
