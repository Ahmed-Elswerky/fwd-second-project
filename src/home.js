import React, { useEffect, useState } from "react";
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
} from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import { useSelector, useDispatch } from "react-redux";
import { userChange, loggedInChange, questionChange } from "./actions/";
import { _getUsers, _getQuestions } from "./data";
import { Link as Route} from "react-router-dom";

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

function DashboardContent() {
  const dispatch = useDispatch();
  const [answered, setAnswered] = useState(true);
  const { loggedIn, users, questions } = useSelector((state) => state);

  useEffect(() => {
    (async () => {
      let questions = await _getQuestions();
      dispatch(questionChange(questions));
    })();
  }, []);

  useEffect(() => {
    // if (!loggedIn.length>0)
    // document.location.pathname = "/login";
    // browserHistory.push('/login')
    if (!loggedIn.length > 0) window.location.pathname = "/login";
    // browserHistory.push('/')
    console.log("loggedIn has been changes", loggedIn);
  }, [loggedIn]);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />

      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
          <nav style={{ marginRight: "0", marginLeft: "auto" }}>
            <Avatar alt="Remy Sharp" src={users[loggedIn]?.avatarURL} />
          </nav>
          <Button
            variant="button"
            color="text.primary"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => dispatch(loggedInChange(""))}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="start">
            <Button variant={answered && "outlined"} onClick={() => setAnswered(true)}>
              Answered
            </Button>
            <Button variant={!answered && "outlined"} onClick={() => setAnswered(false)}>
              Unanswered
            </Button>
          </Stack>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Would you Rather
            </Typography>
          </Container>
          {Object.keys(questions).map((e) => {
            let question = questions[e];
            let qUser = users[question.author];
            if (
              (answered && Object.keys(users[loggedIn].answers).includes(question.id)) ||
              (!answered && !Object.keys(users[loggedIn].answers).includes(question.id))
            )
              return (
                <Container maxWidth="sm" style={{ marginTop: "1rem" }}>
                  <Card>
                    <Paper>
                      <Typography component="h6" variant="h5" align="left" color="text.primary" gutterBottom>
                        <Avatar
                          alt="Remy Sharp"
                          style={{ display: "inline-flex", verticalAlign: "middle", marginRight: "0.5rem" }}
                          src={qUser?.avatarURL}
                        />

                        <div style={{ display: "inline-flex", verticalAlign: "middle" }}>{qUser.name}</div>
                      </Typography>
                      <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        {question.optionOne.text}
                      </Typography>
                      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                        <Route to={'/Question/'+question.id} >
                        <Button variant="outlined">View Question</Button>

                        </Route>
                      </Stack>
                    </Paper>
                  </Card>
                </Container>
              );
          })}
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
