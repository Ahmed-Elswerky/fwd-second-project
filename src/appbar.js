import { Button, Avatar, AppBar, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { loggedInChange } from "./actions/";
import { Link as Route } from "react-router-dom";

function Appbar(props) {
  const dispatch = useDispatch();

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Album layout
        </Typography>
        <nav style={{ marginLeft: "2rem" }}>
          <Route style={{ textDecoration: "none" }} to={"/"}>
            <Button
              variant={(props?.home && "outlined") || ""}
              style={{ color: "white", borderColor: "white" }}
            >
              Home
            </Button>
          </Route>
          <Route style={{ textDecoration: "none" }} to={"/add-question"}>
            <Button
              variant={(props?.add && "outlined") || ""}
              style={{ color: "white", borderColor: "white" }}
            >
              Add Question
            </Button>
          </Route>
          <Route style={{ textDecoration: "none" }} to={"/LeaderBoard"}>
            <Button
              variant={(props?.leaderboard && "outlined") || ""}
              style={{ color: "white", borderColor: "white" }}
            >
              LeaderBoard
            </Button>
          </Route>
        </nav>
        <nav style={{ marginRight: "0", marginLeft: "auto" }}>
          <Avatar
            style={{ display: "inline-flex", verticalAlign: "middle" }}
            alt="Remy Sharp"
            src={props.users[props.loggedIn]?.avatarURL}
          />
          <div style={{ display: "inline-flex",marginLeft:'0.5rem' }}> {props.users[props.loggedIn]?.name}</div>
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
  );
}
export default Appbar;
