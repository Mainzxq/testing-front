import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Home, FilterHdr } from "@material-ui/icons";
import Login from "../pages/Login";
import AuthContext from "../../context/auth/authContext";
import { Avatar } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const menuList = [
  { title: "首页", url: "/" },
  { title: "管理", url: "/manage" },
  { title: "关于", url: "/about" },
  { title: "退出", url: "/logout" }
];

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
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to={props.href} {...props} />
));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isopen, setIsopen] = useState(false);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, askForAuth, askForLogout } = authContext;
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (localStorage.token && !isAuthenticated) {
      askForAuth(localStorage.token);
    }
  });

  const handleOpenLogin = () => {
    setIsopen(!isopen);
  };

  const handleLogOut = () => {
    askForLogout();
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <FilterHdr fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {/* <AllInbox /> */}
            南玻岛
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button component={AdapterLink} color="inherit" href="/">
              <Home fontSize="small" />
              首页
            </Button>
            <Button component={AdapterLink} color="inherit" href="/about">
              关于
            </Button>
            {isAuthenticated ? (
              <Button color="inherit" component={AdapterLink} href="/manage">
                管理
              </Button>
            ) : null}
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogOut}>
                退出
              </Button>
            ) : null}
            {isAuthenticated ? (
              <Avatar style={{ margin: 10, width: 32, height: 32 }} />
            ) : (
              <Button color="inherit" onClick={handleOpenLogin}>
                Login
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            {isAuthenticated ? (
              <div>
                <Avatar
                  style={{ margin: 10, width: 32, height: 32 }}
                  onClick={handleClick}
                />
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  {menuList.map(item => (
                    <MenuItem
                      key={item.title}
                      onClick={handleClose}
                      component={AdapterLink}
                      href={item.url}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : (
              <Button color="inherit" onClick={handleOpenLogin}>
                Login
              </Button>
            )}
          </div>
        </ToolBar>
      </AppBar>
      <Login isopen={isopen} handleOpenLogin={handleOpenLogin} />
    </div>
  );
};

export default Navbar;
