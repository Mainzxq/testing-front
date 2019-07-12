import React, { Fragment, useState, useContext } from "react";
import QuestionContext from "../../context/question/questionContext";
import QuestionItem from "../question/QuestionItem";
import MultiQuestion from "../question/MultiQuestion";

const ManageQestion = () => {
  const questionContext = useContext(QuestionContext);
  const { questions } = questionContext;
  const [state, setState] = useState({
    begin: 0,
    step: 5,
    countNumber: questions && questions.length || 0
  });

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

export default ManageQestion;
