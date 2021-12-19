import React, { useRef } from "react";
import {
  Button,
  Avatar,
  Paper,
  Typography,
  Container,
  Stack,
  Card,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Link as Route } from "react-router-dom";
import { _saveQuestionAnswer } from "./data";
import { useSelector, useDispatch } from "react-redux";
import { userChange } from "./actions/";

function QeustionView(props) {
  const { loggedIn, users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const redirectLink = useRef();

  async function handleChange(e) {
    console.log({ qid: props.question.id, answer: e.target.value, authedUser: loggedIn });
    let users = await _saveQuestionAnswer({
      qid: props.question.id,
      answer: e.target.value,
      authedUser: loggedIn,
    });
    // dispatch(userChange({}));
    dispatch(userChange(users));
    redirectLink?.current.click();
  }
  return (
    <Container maxWidth="sm" key={props.keyy} style={{ marginTop: "1rem" }}>
      <Card>
        <Route to={"/"} ref={redirectLink} />
        <Typography
          component="h6"
          variant="h5"
          style={{ margin: "1rem" }}
          align="left"
          color="text.primary"
          gutterBottom
        >
          <Avatar
            alt="Remy Sharp"
            style={{ display: "inline-flex", verticalAlign: "middle", marginRight: "0.5rem" }}
            src={props.qUser?.avatarURL}
          />
          <div style={{ display: "inline-flex", verticalAlign: "middle" }}>{props.qUser.name} Asking:</div>
        </Typography>
        {props.menu && (
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {props.question?.optionOne?.text}
          </Typography>
        )}
        {!props.menu ? (
          Object?.keys(users[loggedIn]?.answers).includes(props.question.id) ? (
            <FormControl component="fieldset" fullWidth align="center">
              <RadioGroup
                aria-label="choice"
                name="radio-buttons-group"
                // onChange={handleChange}
              >
                <FormControlLabel
                  style={{ alignSelf: "center" }}
                  value={"optionOne"}
                  control={<Radio />}
                  label={
                    props.question?.optionOne?.text +
                      ((props.question.optionOne.votes.includes(loggedIn) && " <==Your choice") || "") || ""
                  }
                />
                <Typography variant="small" align="center" color="text.secondary" paragraph>
                  chosed by {props.question?.optionOne?.votes.length} out of{" "}
                  {props.question?.optionOne?.votes.length + props.question?.optionTwo?.votes.length} votes,{" "}
                  {(props.question?.optionOne?.votes.length /
                    (props.question?.optionOne?.votes.length + props.question?.optionTwo?.votes.length)) *
                    100}
                  %
                </Typography>
                <FormControlLabel
                  style={{ alignSelf: "center" }}
                  value={"optionTwo"}
                  control={<Radio />}
                  label={
                    props.question?.optionTwo?.text +
                      ((props.question.optionTwo.votes.includes(loggedIn) && " <==Your choice") || "") || ""
                  }
                />
                <Typography variant="small" align="center" color="text.secondary" paragraph>
                  chosed by {props.question?.optionTwo?.votes.length} out of{" "}
                  {props.question?.optionOne?.votes.length + props.question?.optionTwo?.votes.length} votes,{" "}
                  {(props.question?.optionTwo?.votes.length /
                    (props.question?.optionOne?.votes.length + props.question?.optionTwo?.votes.length)) *
                    100}
                  %
                </Typography>
              </RadioGroup>
            </FormControl>
          ) : (
            <FormControl component="fieldset" fullWidth align="center">
              <RadioGroup
                aria-label="choice"
                defaultValue=""
                name="radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel
                  style={{ alignSelf: "center" }}
                  value={"optionOne"}
                  control={<Radio />}
                  label={props.question?.optionOne?.text || ""}
                />
                <FormControlLabel
                  style={{ alignSelf: "center" }}
                  value={"optionTwo"}
                  control={<Radio />}
                  label={props.question?.optionTwo?.text || ""}
                />
              </RadioGroup>
            </FormControl>
          )
        ) : null}
        {props.menu && (
          <Stack sx={{ p: 4 }} direction="row" spacing={2} justifyContent="center">
            <Route style={{ textDecoration: "none" }} to={"/Question/" + props.question.id}>
              <Button variant="outlined">View Question</Button>
            </Route>
          </Stack>
        )}
        <Typography sx={{ pl: 4 }} variant="small" align="left" color="text.secondary" paragraph>
          {new Date(props.question?.timestamp).toString().split("GMT")[0]}
        </Typography>
      </Card>
    </Container>
  );
}
export default QeustionView;
