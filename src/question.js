// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Grid,
//   IconButton,
//   Button,
//   Link,
//   Avatar,
//   CssBaseline,
//   AppBar,
//   Box,
//   Toolbar,
//   Paper,
//   Typography,
//   Container,
//   Stack,
//   Card,
// } from "@mui/material";
// function Question(props) {
//   const { questions, users } = useSelector((state) => state);
//   const [state, setState] = useState({
//     id: "",
//     question: {},
//     qUser: {},
//   });
//   useEffect(() => {
//     let id = props?.match?.params.id || "";
//     // if (!id.length > 0) window.location.pathname = "/";
//     if (id.length > 0) {
//       let question = questions[id];
//       let qUser = users[question.author];
//       setState({ ...state, id, question, qUser });
//       console.log(id, question, qUser);
//     }
//     console.log(props);
//   }, []);
//   return (
//     <ThemeProvider theme={mdTheme}>
//       <CssBaseline />

//       <AppBar position="relative">
//         <Toolbar>
//           <Typography variant="h6" color="inherit" noWrap>
//             Album layout
//           </Typography>
//           <nav style={{ marginRight: "0", marginLeft: "auto" }}>
//             <Avatar alt="Remy Sharp" src={users[loggedIn]?.avatarURL} />
//           </nav>
//           <Button
//             variant="button"
//             color="text.primary"
//             sx={{ my: 1, mx: 1.5 }}
//             onClick={() => dispatch(loggedInChange(""))}
//           >
//             Log out
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <main>
//         <Box
//           sx={{
//             bgcolor: "background.paper",
//             pt: 8,
//             pb: 6,
//           }}
//         >
//           <Container maxWidth="sm" style={{ marginTop: "1rem" }}>
//             <Card>
//               <Paper>
//                 <Typography component="h6" variant="h5" align="left" color="text.primary" gutterBottom>
//                   <Avatar
//                     alt="Remy Sharp"
//                     style={{ display: "inline-flex", verticalAlign: "middle", marginRight: "0.5rem" }}
//                     src={state.qUser?.avatarURL}
//                   />

//                   <div style={{ display: "inline-flex", verticalAlign: "middle" }}>{state.qUser.name}</div>
//                 </Typography>
//                 <Typography variant="h5" align="center" color="text.secondary" paragraph>
//                   {state.question?.optionOne?.text}
//                   {state.question?.optionTwo?.text}
//                 </Typography>
//               </Paper>
//             </Card>
//           </Container>
//         </Box>
//       </main>
//     </ThemeProvider>
//   );
// }

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
import { Link as Route, useParams } from "react-router-dom";
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

function Question(props) {
  const { id } = useParams();
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

  const [state, setState] = useState({
    id: "",
    question: {},
    qUser: {},
  });
  useEffect(() => {
    // if (!id.length > 0) window.location.pathname = "/";
    if (id.length > 0) {
      let question = questions[id];
      let qUser = users[question.author];
      setState({ ...state, id, question, qUser });
    }
  }, []);
  if(loggedIn.length>0)
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />

      <Appbar users={users} loggedIn={loggedIn} />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}>
          <QuestionView question={state?.question} keyy={"qp"} qUser={state.qUser} menu={false} />
        </Box>
      </main>
    </ThemeProvider>
  );
  return(<></>)
}

export default Question;
