import React, { useEffect, useState, useRef } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Grid,
  IconButton,
  Button,
  Link,
  Avatar,
  CssBaseline,
  AppBar,
  Box,
  Toolbar,
  Paper,
  Typography,
  Container,
  Stack,
  Card,
  InputLabel,
  FormControl,
  Input,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { userChange, loggedInChange, questionChange } from "./actions/";
import { _saveQuestion } from "./data";
import { Link as Route, useParams, BrowserRouter } from "react-router-dom";
import Appbar from "./appbar";
import QuestionView from "./questionView";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const mdTheme = createTheme();

function AddQuestion(props) {
  const redirectLink = useRef();
  const sub = useRef();

  const { id } = useParams();
  const dispatch = useDispatch();
  const [answered, setAnswered] = useState(true);
  const { loggedIn, users, questions } = useSelector((state) => state);

  //   useEffect(() => {
  //     (async () => {
  //       let questions = await _getQuestions();
  //       dispatch(questionChange(questions));
  //     })();
  //   }, []);

  useEffect(() => {
    // if (!loggedIn.length>0)
    // document.location.pathname = "/login";
    // browserHistory.push('/login')
    if (!loggedIn.length > 0) window.location.pathname = "/login";
    // browserHistory.push('/')
    console.log("loggedIn has been changes", loggedIn);
  }, [loggedIn]);

  const [state, setState] = useState({
    // id: generateUID(),
    one: "",
    two: "",
  });
  //   useEffect(() => {
  //     // if (!id.length > 0) window.location.pathname = "/";
  //     if (id.length > 0) {
  //       let question = questions[id];
  //       let qUser = users[question.author];
  //       setState({ ...state, id, question, qUser });
  //     }
  //   }, []);
  async function handleSave() {
    if (state.one.length > 0 && state.two.length > 0) {
      //   await dispatch(
      //     questionChange({
      //       ...questions,
      //       [state.id]: {
      //         id: state.id,
      //         optionOne: { text: state.one, votes: [] },
      //         optionTwo: { text: state.two, votes: [] },
      //         author: loggedIn || "",
      //         timestamp: new Date().getTime(),
      //       },
      //     })
      //   );
      sub.current.disabled = true;
      let users1 = await _saveQuestion({
        optionOneText: state.one,
        optionTwoText: state.two,
        author: loggedIn,
      });
      console.log(users1)
      dispatch(userChange({}));
      dispatch(userChange(users1));
      redirectLink?.current.click();
      //   BrowserRouter.push("/");
    }
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />

      <Appbar users={users} loggedIn={loggedIn} add={true} />
      <main>
        <Box
          sx={{
            mt: "30vh",
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Route to={"/"} ref={redirectLink} />
          <Typography component="h1" align="center" variant="h5">
            Add a (Would you Rather) Question
          </Typography>
          <Container maxWidth="sm" key={"add"} style={{ marginTop: "1rem" }}>
            <Card>
              <FormControl style={{ margin: "1rem" }} fullWidth>
                <InputLabel id="demo-simple-select-label">First Choice</InputLabel>
                <Input onChange={(e) => setState({ ...state, one: e.target.value })} />
              </FormControl>
              <FormControl style={{ margin: "1rem" }} fullWidth>
                <InputLabel id="demo-simple-select-label">Second Choice</InputLabel>
                <Input onChange={(e) => setState({ ...state, two: e.target.value })} />
              </FormControl>
              <Button
                onClick={handleSave}
                ref={sub}
                variant="contained"
                style={{ display: "flex" }}
                sx={{ m: "auto", mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Card>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default AddQuestion;
