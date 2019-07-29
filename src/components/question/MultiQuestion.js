import React, { useContext } from "react";
import {
  Check,
  Edit,
  Delete,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank
} from "@material-ui/icons";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Chip,
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Button,
  Divider,
  Checkbox
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import QuestionContext from "../../context/question/questionContext";
import AuthContext from "../../context/auth/authContext";

const useSytles = makeStyles(theme => ({
  card: {
    maxWidth: 800,
    margin: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  title: {
    fontSize: 12
  },
  normal: {
    fontSize: 10,
    color: "#666666"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  chip: {
    fontSize: 10,
    height: 14
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: indigo[500]
  }
}));

const MultiQuestion = ({ props }) => {
  const questionContext = useContext(QuestionContext);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const { deleteQuestion, updateQuestion } = questionContext;
  const { answered, id, type, title, craeteDate, options } = props;
  const classes = useSytles();
  const [optionsa, setOptionsa] = React.useState(options);

  const handleChange = e => {
    options.map(item => {
      if (item.id === e.target.value) {
        item.isRight = e.target.checked;
      }
      return item.id;
    });
    setOptionsa({ options });
  };

  const handleUpdateClick = () => {
    if (props.options.filter(item => item.isRight).length === 0) {
      props.answered = false;
    } else {
      props.answered = true;
    }
    console.log(optionsa);
    updateQuestion(props);
  };

  const handleDeleteClick = () => {
    deleteQuestion(id);
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            <Typography component="p" variant="h6" style={{ fontSize: 12 }}>
              {id.split("-")[0].toUpperCase() + id.split("-")[1]}
            </Typography>
          </Avatar>
        }
        title={
          <Typography className={classes.title}>
            {title.replace("&lt;p&gt;", "").replace("&lt;/p&gt;", "")}
          </Typography>
        }
        subheader={
          <div className={classes.normal}>
            <span>{type === "radio" ? "单选 " : "多选 "}</span>

            <Chip
              color={answered ? "primary" : "secondary"}
              label={answered ? "已答" : "未答"}
              size="small"
              className={classes.chip}
            />

            <span> 创建时间: {craeteDate.slice(0, 10)}</span>
          </div>
        }
      />
      <Divider />
      <CardContent>
        <FormControl component="fieldset" style={{ marginLeft: 54 }}>
          <FormLabel component="legend" className={classes.normal}>
            请选择答案：
          </FormLabel>
          {options.map(item => (
            <div key={item._id}>
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlank />}
                    checkedIcon={<CheckBoxIcon />}
                    color="primary"
                    fontSize="small"
                    disabled={!isAuthenticated}
                    checked={item.isRight}
                    onChange={handleChange}
                  />
                }
                value={item.id}
                label={
                  <Typography className={classes.normal}>
                    {item.text
                      .replace("&lt;p&gt;", "")
                      .replace("&lt;/p&gt;", "")}
                  </Typography>
                }
                labelPlacement="end"
              />
              {item.isRight ? (
                <Check htmlColor="green" fontSize="small" viewBox="0 0 24 12" />
              ) : (
                ""
              )}
            </div>
          ))}
        </FormControl>
      </CardContent>
      {isAuthenticated && (
        <div style={{ float: "right" }}>
          <Button
            size="small"
            style={{ height: 26, width: 40, margin: 8 }}
            className={classes.normal}
            onClick={handleUpdateClick}
          >
            修改
            <Edit fontSize="small" style={{ fontSize: 14, paddingLeft: 4 }} />
          </Button>
          <Button
            size="small"
            style={{ height: 26, width: 40, margin: 8 }}
            className={classes.normal}
            onClick={handleDeleteClick}
          >
            删除
            <Delete fontSize="small" style={{ fontSize: 16, paddingLeft: 4 }} />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default MultiQuestion;
