import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, IconButton, Button, Link, Avatar, CssBaseline, AppBar, Box, Toolbar, Paper, Typography, Container, Stack, Card } from "@mui/material";
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
import QuestionView from './questionView'
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
  const [answered, setAnswered] = useState(false);
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
      <Appbar users={users} loggedIn={loggedIn} home={true}/>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}>
          <Stack style={{padding:'1rem'}} direction="row" spacing={2} justifyContent="start">
            <Button variant={answered && "outlined"||''} onClick={() => setAnswered(true)}>
              Answered
            </Button>
            <Button variant={!answered && "outlined"||''} onClick={() => setAnswered(false)}>
              Unanswered
            </Button>
          </Stack>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Would you Rather
            </Typography>
          </Container>
          {Object.keys(questions).map((e,k) => {
            let question = questions[e];
            let qUser = users[question.author];
            if(users!=undefined&&users!=null)
            if ((answered && Object?.keys(users[loggedIn]?.answers)?.includes(question.id)) || (!answered && !Object?.keys(users[loggedIn].answers).includes(question.id)))
              return (
                // <Container maxWidth="sm" style={{ marginTop: "1rem" }}>
                //   <Card>
                //     <Paper>
                //       <Typography component="h6" variant="h5" align="left" color="text.primary" gutterBottom>
                //         <Avatar alt="Remy Sharp" style={{ display: "inline-flex", verticalAlign: "middle", marginRight: "0.5rem" }} src={qUser?.avatarURL} />

                //         <div style={{ display: "inline-flex", verticalAlign: "middle" }}>{qUser.name}</div>
                //       </Typography>
                //       <Typography variant="h5" align="center" color="text.secondary" paragraph>
                //         {question.optionOne.text}
                //       </Typography>
                //       <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                //         <Route to={"/Question/" + question.id}>
                //           <Button variant="outlined">View Question</Button>
                //         </Route>
                //       </Stack>
                //     </Paper>
                //   </Card>
                // </Container>
                <QuestionView question={question} keyy={k+'mq'} key={k+'mqc'} qUser={qUser} menu={true}/>
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
