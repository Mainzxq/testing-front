import React, {useContext} from "react";
import {
  Check,
  Edit,
  RadioButtonChecked,
  RadioButtonUnchecked
} from "@material-ui/icons";
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
  Divider
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import QuestionContext from '../../context/question/questionContext'

const useSytles = makeStyles(theme => ({
  card: {
    maxWidth: 800,
    margin: theme.spacing(1)
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

const QuestionItem = ({ props }) => {
  const questionContext = useContext(QuestionContext)
  const {deleteQuestion, updateQuestion} = questionContext 
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
    console.log(e.target);
  };

  const handleUpdateClick = () => {
    updateQuestion(props)
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {id.split("-")[0].toUpperCase() + id.split("-")[1]}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="Settings">
        //     <MoreVert />
        //   </IconButton>
        // }
        title={
          <Typography className={classes.title}>
            {title.replace("&lt;p&gt;", "").replace("&lt;/p&gt;", "")}
          </Typography>
        }
        subheader={
          <div className={classes.normal}>
            <span>{type === "radio" ? "单选 " : "多选 "}</span>
            {answered ? (
              <Chip
                color="primary"
                label="已答"
                size="small"
                className={classes.chip}
              />
            ) : (
              <Chip
                color="secondary"
                label="未答"
                size="small"
                component="p"
                className={classes.chip}
              />
            )}
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
                      disabled={false}
                      checked={item.isRight}
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
                  <Check
                    htmlColor="green"
                    fontSize="small"
                    viewBox="0 0 24 12"
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>

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
        >
          修改1
          <Edit fontSize="small" style={{ fontSize: 14, paddingLeft: 4 }} />
        </Button>
      </div>
    </Card>
  );
};

QuestionItem.propTypes = {};

export default QuestionItem;
