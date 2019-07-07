import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { Button, Dialog, TextField } from "@material-ui/core";

const userStyles = makeStyles(theme => ({
  container: {
    //background: theme.palette.common.white
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    color: "#777777",
    minHeight: 32
  },
  avatar: {
    margin: theme.spacing(1),
    fontSize: 64
  },
  form: {
    width: "80%",
    maxWidth: 240,
    marginTop: theme.spacing(1)
  },
  textfield: {
    marginTop: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const Login = props => {
  const [open, setOpen] = useState(false);
  const { isopen, handleOpenLogin } = props;
  const classes = userStyles();
  const fieldclass = classes.textfield;
  useEffect(() => {
    setOpen(isopen);
  }, [props,isopen]);

  const handleClickClose = () => {
    handleOpenLogin();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        className={classes.container}
      >
        <div className={classes.paper}>
          <div>
            <AccountCircle color="primary" className={classes.avatar} />
          </div>
          <Typography component="h1" varian="h6">
            南玻岛用户登录
          </Typography>
          <form noValidate className={classes.form}>
            <TextField
              InputProps={{ fieldclass }}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="username"
              label="用户名"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              InputProps={{ fieldclass }}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="password"
              label="密码"
              name="password"
              type="password"
              autoComplete="password"
            />

            <Button
              variant="contained"
              fullWidth
              color="primary"
              className={classes.button}
            >
              登录
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Login;