import React from "react";
import PropTypes from "prop-types";
import { MoreVert } from "@material-ui/icons";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  CardMedia,
  Badge,
  Chip
} from "@material-ui/core";
import { red, indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useSytles = makeStyles(theme => ({
  card: {
    maxWidth: 800,
    margin: theme.spacing(1)
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: indigo[500]
  }
}));

const QuestionItem = ({ props }) => {
  const { answered, id, type, title, craeteDate } = props;
  const classes = useSytles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {id.split("-")[0].toUpperCase() + id.split("-")[1]}
          </Avatar>
        }
        action={
          <IconButton aria-label="Settings">
            <MoreVert />
          </IconButton>
        }
        title={
          <div>
            {title.replace("&lt;p&gt;", "").replace("&lt;/p&gt;", "")}
            {}
          </div>
        }
        subheader={
          <div>
            <span>{type === "radio" ? "单选 " : "多选 "}</span>
            {answered ? (
              <Chip color="primary" label="已答" size="small" />
            ) : (
              <Chip color="secondary" label="未答" size="small" />
            )}
            <span> 创建时间: {craeteDate}</span>
          </div>
        }
      />
      <CardMedia />
      <CardContent />
    </Card>
  );
};

QuestionItem.propTypes = {};

export default QuestionItem;
