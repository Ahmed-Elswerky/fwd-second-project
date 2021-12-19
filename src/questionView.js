import { Button, Avatar, Paper, Typography, Container, Stack, Card } from "@mui/material";
import { Link as Route } from "react-router-dom";

function QeustionView(props) {
  return (
    <Container maxWidth="sm" key={props.keyy} style={{ marginTop: "1rem" }}>
      <Card>
        <Paper>
          <Typography component="h6" variant="h5" style={{padding:'1rem'}} align="left" color="text.primary" gutterBottom>
            <Avatar alt="Remy Sharp" style={{ display: "inline-flex", verticalAlign: "middle", marginRight: "0.5rem" }} src={props.qUser?.avatarURL} />
            <div style={{ display: "inline-flex", verticalAlign: "middle" }}>{props.qUser.name}</div>
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {props.question?.optionOne?.text}
          </Typography>
          {props.menu && (
            <Stack sx={{ p: 4 }} direction="row" spacing={2} justifyContent="center">
              <Route style={{textDecoration:'none'}} to={"/Question/" + props.question.id}>
                <Button variant="outlined">View Question</Button>
              </Route>
            </Stack>
          )}
        </Paper>
      </Card>
    </Container>
  );
}
export default QeustionView;
