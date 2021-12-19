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
import { Link as Route } from "react-router-dom";
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

function LeaderBoard() {
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
  }, [loggedIn]);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Appbar users={users} loggedIn={loggedIn} leaderboard={true} />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Leader Board
            </Typography>
          </Container>
          {Object?.keys(users)
            .sort(
              (a, b) =>
                users[b].questions.length +
                Object.keys(users[b].answers).length -
                (users[a].questions.length + Object.keys(users[a].answers).length)
            )
            .map((e, k) => {
              let user = users[e];
              return (
                <Container maxWidth="sm" key={k+'l'} style={{ marginTop: "1rem" }}>
                  <Card>
                    <Typography
                      component="h6"
                      style={{ margin: "1rem" }}
                      variant="h5"
                      align="left"
                      color="text.primary"
                      gutterBottom
                    >
                      <Avatar
                        alt="Remy Sharp"
                        style={{ display: "inline-flex", verticalAlign: "middle", marginRight: "0.5rem" }}
                        src={user?.avatarURL}
                      />

                      <div style={{ display: "inline-flex", verticalAlign: "middle" }}>{user.name}</div>
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                      Answered Questions : {Object.keys(user.answers).length || 0}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                      Created Questions : {user.questions.length || 0}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                      Score : {user.questions.length + Object.keys(user.answers).length || 0}
                    </Typography>
                  </Card>
                </Container>
              );
            })}
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default LeaderBoard;
