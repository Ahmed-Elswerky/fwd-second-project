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
        <nav style={{marginLeft:'2rem'}}>
          <Route style={{ textDecoration: "none" }} to={"/"}>
            <Button style={{color:'white'}}>Home</Button>
          </Route>
        </nav>
        <nav style={{ marginRight: "0", marginLeft: "auto" }}>
          <Avatar alt="Remy Sharp" src={props.users[props.loggedIn]?.avatarURL} />
        </nav>
        <Button variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }} onClick={() => dispatch(loggedInChange(""))}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default Appbar;
