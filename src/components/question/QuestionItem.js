import React from "react";
import PropTypes from "prop-types";
import { MoreVert, Check } from "@material-ui/icons";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Chip,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup
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
  chip: {
    fontSize: 7
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
  const { answered, id, type, title, craeteDate, options } = props;
  const classes = useSytles();
  const [expanded, setExpanded] = React.useState(false);
  const [optionsa, setOptionsa] = React.useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = e => {
    setOptionsa(e.target.value);
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
          <div>{title.replace("&lt;p&gt;", "").replace("&lt;/p&gt;", "")}</div>
        }
        subheader={
          <div>
            <span>{type === "radio" ? "单选 " : "多选 "}</span>
            {answered ? (
              <Chip
                color="primary"
                label="已答"
                size="small"
                className={classes.chip}
              />
            ) : (
              <Chip color="secondary" label="未答" size="small" />
            )}
            <span> 创建时间: {craeteDate}</span>
          </div>
        }
      />
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">请选择答案：</FormLabel>
          <RadioGroup
            aria-label="position"
            name={id}
            value={optionsa}
            onChange={handleChange}
          >
            {options.map(item => (
              <FormControlLabel
                key={item.id}
                control={<Radio color="primary" />}
                value={item.id}
                checked={item.isRight}
                label={item.text
                  .replace("&lt;p&gt;", "")
                  .replace("&lt;/p&gt;", "")}
                labelPlacement={item.text
                  .replace("&lt;p&gt;", "")
                  .replace("&lt;/p&gt;", "")}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

QuestionItem.propTypes = {};

export default QuestionItem;
