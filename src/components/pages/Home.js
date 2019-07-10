import React, { useState, useContext } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import Questions from "../question/Question";
import QuestionContext from "../../context/question/questionContext";

const userStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing(1),
    float: "right"
  }
}));

const textStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    backgroundColor: "#fff"
  }
}));

const Home = () => {
  const questionContext = useContext(QuestionContext);
  const { searchByTitle } = questionContext;
  const classes = userStyles();
  const textclass = textStyles();
  const [value, setValue] = useState(null);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      handleSeach();
    }
  };
  const handleSeach = () => {
    searchByTitle(value);
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item>
            <h1>南玻岛查询</h1>
          </Grid>
          <Grid item>
            <p>孤峰绝岛俨相向，鬼啸猿啼垂女萝。</p>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end" justify="center">
          <Grid item>
            <SearchRounded />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              inputProps={{ textclass }}
              id="filled-input"
              label="输入你要找的东西"
              autoComplete="aaaaaa"
              margin="normal"
              onChange={handleChange}
              onKeyUp={handleKeyUp}
            />
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSeach}
            >
              我要查询
            </Button>
          </Grid>
          <Grid item>
            <Questions />
          </Grid>
        </Grid>
       
      </Container>
    </div>
  );
};

export default Home;
