import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Inbox as InboxIcon, Drafts as DraftsIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const menuList = [
  {
    itemName: "管理问题",
    url: "/manage"
  },
  {
    itemName: "管理用户",
    url: "/user"
  },
  {
    itemName: "管理权限",
    url: "auth"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    maxWidth: 360,
    marginTop: 24,
    backgroundColor: theme.palette.background.paper,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  }
}));

class ListItemLink extends React.Component {
  RouteLink = React.forwardRef((itemProps, ref) => (
    <Link to={this.props.to} {...itemProps} innerRef={ref} />
  ));
  render() {
    const { to, primary, secondary, icon, selected } = this.props;
    return (
      <ListItem button selected={selected} component={this.RouteLink}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    );
  }
}

const ListMenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Main mailbox folders">
        <ListItemLink
          to="/manage"
          primary="关于我的信息"
          secondary="查看关于的有关信息"
          icon={<InboxIcon />}
          selected={true}
        />
        <ListItemLink
          to="/about"
          primary="修改用户"
          secondary="修改用户信息"
          icon={<DraftsIcon />}
        />
      </List>
    </div>
  );
};

export default ListMenu;
