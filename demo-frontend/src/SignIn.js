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
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RESOURCE_API_SIGNIN = "http://localhost:5000/signin";
const RESOURCE_API_REGISTER = "http://localhost:5000/register";

export default function SignIn({ token, setToken }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailr, setEmailR] = React.useState("");
  const [name, setName] = React.useState("");
  const [passwordr, setPasswordR] = React.useState("");
  const [dob, setDob] = React.useState(dayjs("2022-04-07"));

  const navigate = useNavigate();

  useEffect(() => {
    if(token) {
       navigate('/RM');
    }
  }, [token]);


  const signIn = (credentials) => {
    axios
      .post(RESOURCE_API_SIGNIN, credentials)
      .then(function (response) {
        setToken(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const register = (credentials) => {
    axios
      .post(RESOURCE_API_REGISTER, credentials)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    const credentials = {
      email: email,
      password: password,
    };
    signIn(credentials);
  };

  const handleRegister = () => {
    const credentials = {
      email: emailr,
      password: passwordr,
      name: name,
      dob: dob
    };
    register(credentials);
  };

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
                  <TextField
                    id="email"
                    label={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="standard"
                    placeholder="Email"
                  />
                  <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  <IconButton
                    disabled={password === "" || email === ""}
                    onClick={handleSubmit}
                  >
                    <LoginIcon />
                  </IconButton>
                </Stack>
                <Card style={{ minHeight: "50vh", minWidth: "50vh" }}>
                  <CardContent>
                    <Stack
                      spacing={2}
                      divider={<Divider orientation="horizontal" flexItem />}
                    >
                      <Typography sx={{ mt: 0.1, mb: 0.1 }} variant="h6">
                        Register:
                      </Typography>
                      <TextField
                        id="emailr"
                        label={emailr}
                        onChange={(e) => setEmailR(e.target.value)}
                        variant="standard"
                        placeholder="Email"
                      />
                      <TextField
                        id="passwordr"
                        label="Password"
                        onChange={(e) => setPasswordR(e.target.value)}
                        variant="standard"
                        type="password"
                        placeholder="Password"
                      />
                      <TextField
                        placeholder="Name"
                        id="name"
                        label={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="standard"
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          inputFormat="MM/DD/YYYY"
                          renderInput={(props) => <TextField {...props} />}
                          label="DatePicker"
                          value={dob}
                          onChange={(newValue) => {
                            setDob(newValue);
                          }}
                        />
                      </LocalizationProvider>
                      <IconButton
                        disabled={
                          passwordr === "" || emailr === "" || name === ""
                        }
                        onClick={handleRegister}
                      >
                        <HowToRegIcon />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </CardContent>
          </Card>
        </Grow>
      </Grid>
      
    </Grid>
  );
}
