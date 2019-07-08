import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Home } from "@material-ui/icons";
import Login from "../pages/Login";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden",
    flexGrow: 1,
    height: 64
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [isopen, setIsopen] = useState(false);

  const handleOpenLogin = () => {
    setIsopen(!isopen);
  };

  return (
    <div className={classes.root}>
      <AppBar className="static">
        <ToolBar variant="regular" style={{ overflow: "hidden" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {/* <AllInbox /> */}
            南玻岛
          </Typography>
          <Button color="inherit" href="/">
            <Home fontSize="small" />
            首页
          </Button>
          <Button color="inherit" href="/about">
            关于
          </Button>
          <Button color="inherit" onClick={handleOpenLogin}>
            Login
          </Button>
        </ToolBar>
      </AppBar>
      <Login isopen={isopen} handleOpenLogin={handleOpenLogin} />
    </div>
  );
};

export default Navbar;
