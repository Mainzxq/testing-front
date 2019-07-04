import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import Questions from "../question/Question";

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
  const classes = userStyles();
  const textclass = textStyles();
  const [values, setValues] = useState({
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "Eur"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    console.log(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Container>
        <h1>南玻岛查询</h1>
        <p>孝顺，上进，完成工作</p>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchRounded />
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              inputProps={{ textclass }}
              id="filled-input"
              label="输入你要找的东西"
              autoComplete="aaaaaa"
              margin="normal"
              onChange={handleChange("name")}
            />
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={()=>{}}
            >
              我要查询
            </Button>
          </Grid>
        </Grid>
        <Questions />
      </Container>
    </div>
  );
};

export default Home;
