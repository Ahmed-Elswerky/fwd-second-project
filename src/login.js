import React, { useEffect,useState,useRef } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  Grid,
  Box,
  Link,
  Typography,
  Container,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useSelector, useDispatch } from "react-redux";
import { userChange ,loggedInChange} from "./actions/";

import { _getUsers, _getQuestions } from "./data";
import { Link as Route} from "react-router-dom";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://swerky.web.app">
        Ahmed Elswerky
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const redirectLink = useRef()
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userId, setUserId] = useState({})

  useEffect(() => {
    (async () => {
      let usersData = await _getUsers();
      dispatch(userChange(usersData));
    })();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    dispatch(loggedInChange(userId));
    redirectLink?.current.click()
    // console.log(redirectLink)

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>{/* <LockOutlinedIcon /> */}</Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select label="Profile" value={userId} onChange={(e) => setUserId(e.target.value)}>
                {console.log(users)}
                {Object.keys(users).map((e, k) => {
                  let user = users[e];
                  return (
                    <MenuItem value={user.id} key={k + "u"}>
                      <Grid>
                        <Grid>
                          <Avatar alt="Remy Sharp" src={user.avatarURL} />
                        </Grid>
                        <Grid>{user.name}</Grid>
                      </Grid>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Route to={'/'} ref={redirectLink}/>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Log In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
