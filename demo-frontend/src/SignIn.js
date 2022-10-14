import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Grow in={true} timeout={1000}>
          <Card style={{ minHeight: "50vh", minWidth: "50vh" }}>
            <CardContent>
            <Stack
                      spacing={2}
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                    >
              <Stack
                spacing={2}
                divider={<Divider orientation="horizontal" flexItem />}
              >
                <Typography sx={{ mt: 0.1, mb: 0.1 }} variant="h6">
                  Sign In:
                </Typography>
                <TextField id="username" label="Username" variant="standard" />
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                />
                <IconButton>
                  <LoginIcon />
                </IconButton>
                </Stack>
                <Stack
                spacing={2}
              >
              <Typography sx={{ mt: 0.1, mb: 0.1 }} variant="h8">
                  If you need an account you can register here:
                  </Typography>
                  <IconButton>
                  <LoginIcon component={Link} to="/Register"/>
                </IconButton>
              </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grow>
      </Grid>
    </Grid>
  );
}
