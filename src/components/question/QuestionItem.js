import React, { useContext, useState } from "react";
import {
  Check,
  Edit,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Delete,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank
} from "@material-ui/icons";
import { green, amber, indigo } from "@material-ui/core/colors";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Chip,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Typography,
  Button,
  Checkbox,
  Snackbar,
  SnackbarContent,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QuestionContext from "../../context/question/questionContext";
import AuthContext from "../../context/auth/authContext";

const useSytles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  failed: {
    backgroundColor: amber[700]
  },
  card: {
    maxWidth: 800,
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
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
  chip: {
    fontSize: 10,
    height: 14
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: indigo[500],
    fontSize: 12
  }
}));

const QuestionItem = ({ props }) => {
  const questionContext = useContext(QuestionContext);
  const authContext = useContext(AuthContext);
  const [alert, setAlert] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
    msg: "",
    failed: false
  });
  const { open, vertical, horizontal, msg, failed } = alert;
  const { isAuthenticated } = authContext;
  const { deleteQuestion, updateQuestion } = questionContext;
  const { answered, id, type, title, craeteDate, options } = props;
  const classes = useSytles();
  const [optionsa, setOptionsa] = React.useState(options);

  const handleChange = e => {
    options.map(item => {
      if (item.id === e.target.value) {
        item.isRight = true;
      } else {
        item.isRight = false;
      }
      return item.id;
    });
    setOptionsa({ options });
  };
  const handleMultiChange = e => {
    options.map(item => {
      if (item.id === e.target.value) {
        item.isRight = e.target.checked;
      }
      return item.id;
    });
    setOptionsa({ options });
  };

  const closeAlert = () => {
    setAlert({ ...alert, open: false });
  };
  const handleUpdateClick = async () => {
    if (props.options.filter(item => item.isRight).length === 0) {
      props.answered = false;
    } else {
      props.answered = true;
    }
    const res = await updateQuestion(props);
    console.log(res);
    if (res === 0) {
      setAlert({ ...alert, msg: "修改成功", open: true });
    } else {
      setAlert({ ...alert, msg: "修改失败", open: true, failed: true });
    }
  };

  const handleDeleteClick = () => {
    deleteQuestion(id);
  };

  const RadioAnswer = options => {
    return (
      <RadioGroup
        aria-label="position"
        name={id}
        value={optionsa.id}
        onChange={handleChange}
      >
        {options.map(item => (
          <div key={item._id}>
            <FormControlLabel
              key={item.id}
              control={
                <Radio
                  color="primary"
                  fontSize="small"
                  icon={<RadioButtonUnchecked fontSize="small" />}
                  checkedIcon={<RadioButtonChecked fontSize="small" />}
                  disabled={!isAuthenticated}
                  checked={item.isRight}
                />
              }
              value={item.id}
              label={
                <Typography className={classes.normal}>
                  {item.text.replace("&lt;p&gt;", "").replace("&lt;/p&gt;", "")}
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
      </RadioGroup>
    );
  };

  const CheckBoxAnswer = options => {
    return (
      <div>
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
                  onChange={handleMultiChange}
                />
              }
              value={item.id}
              label={
                <Typography className={classes.normal}>
                  {item.text.replace("&lt;p&gt;", "").replace("&lt;/p&gt;", "")}
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
      </div>
    );
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
          {props.type === "radio"
            ? RadioAnswer(options)
            : CheckBoxAnswer(options)}
        </FormControl>
      </CardContent>
      {isAuthenticated ? (
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
            重置
            <Delete fontSize="small" style={{ fontSize: 16, paddingLeft: 4 }} />
          </Button>
        </div>
      ) : (
        ""
      )}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={closeAlert}
        autoHideDuration={3000}
      >
        <SnackbarContent
          className={!failed ? classes.success : classes.failed}
          aria-describedby="client-snackbar"
          message={<span id="client-snackbar">{msg}</span>}
        />
      </Snackbar>
    </Card>
  );
};

QuestionItem.propTypes = {};

export default QuestionItem;
