import React, { Fragment, useContext } from "react";
import QuestionContext from "../../context/question/questionContext";
import QuestionItem from "./QuestionItem";
import MultiQuestion from "./MultiQuestion";

const Question = () => {
  const questionContext = useContext(QuestionContext);
  const { questions } = questionContext;

  return (
    <Fragment>
      {questions &&
        questions
          .slice(0, 5)
          .map(question =>
            question.type === "radio" ? (
              <QuestionItem key={question.id} props={question} />
            ) : (
              <MultiQuestion key={question.id} props={question} />
            )
          )}
    </Fragment>
  );
};

export default Question;
