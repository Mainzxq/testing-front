import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import ManageContext from "../../context/manage/manageContext";
import QuestionItem from "./QuestionItem";
import MultiQuestion from "../question/MultiQuestion";
import { Grid, Button } from "@material-ui/core";

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
    console.log(state);
    console.log(state.questionSlice.length);
  };

  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          {console.log(state.questionSlice)}
          {
            state.questionSlice.map(question =>
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
