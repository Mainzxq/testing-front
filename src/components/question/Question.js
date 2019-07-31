import React, { Fragment, useContext } from "react";
import QuestionContext from "../../context/question/questionContext";
import QuestionItem from "./QuestionItem";

const Question = () => {
  const questionContext = useContext(QuestionContext);
  const { questions } = questionContext;

  return (
    <Fragment>
      {questions &&
        questions
          .slice(0, 5)
          .map(question =>
            
              <QuestionItem key={question.id} props={question} />
          
          )}
      <div style={{height:64}} />
    </Fragment>
  );
};

export default Question;
