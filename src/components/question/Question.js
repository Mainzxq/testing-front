import React, { Fragment, useContext } from "react";
import QuestionContext from "../../context/question/questionContext";
import QuestionItem from "./QuestionItem";

const Question = () => {
  const questionContext = useContext(QuestionContext);
  const { questions } = questionContext;
  return (
    <Fragment>
      {questions.map(question => (
        <QuestionItem key={question.id} props={question} />
      ))}
    </Fragment>
  );
};

export default Question;
