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
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const RESOURCE_API_SIGNIN = "http://localhost:5000/signin";
const RESOURCE_API_REGISTER = "http://localhost:5000/register";

export default function SignIn({ token, setToken }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailr, setEmailR] = React.useState("");
  const [name, setName] = React.useState("");
  const [passwordr, setPasswordR] = React.useState("");
  const [dob, setDob] = React.useState(dayjs());

  const [sropen, setSROpen] = React.useState(false);
  const [wropen, setWROpen] = React.useState(false);
  const [wlopen, setWLOpen] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/RM");
    }
  // eslint-disable-next-line
  }, [token]);

  const signIn = (credentials) => {
    axios
      .post(RESOURCE_API_SIGNIN, credentials)
      .then(function (response) {
        if(response.data !== false) {
            setToken(response.data);
        }
        else {
            setWLOpen(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setWLOpen(true);
      });
  };

  const register = (credentials) => {
    axios
      .post(RESOURCE_API_REGISTER, credentials)
      .then(function (response) {
        if(response.data) {
            console.log(response.data);
            setSROpen(true);
        }
        else {
            setWROpen(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setWROpen(true);
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
      dob: dob,
    };
    register(credentials);
  };

  const handleWLClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWLOpen(false);
  };
  const handleSRClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSROpen(false);
  };
  const handleWRClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWROpen(false);
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
                  divider={<Divider orientation="horizontal" flexItem />}
                >
                <Typography sx={{ mt: 0.1, mb: 0.1 }} variant="h6">
                    Welcome to Resource Manager
                  </Typography>
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
                          label="Date of Birth"
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
              </Stack>
            </CardContent>
          </Card>
        </Grow>
      </Grid>
      <Snackbar open={wlopen} autoHideDuration={6000} onClose={handleWLClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleWLClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Login failed.
        </MuiAlert>
      </Snackbar>
      <Snackbar open={wropen} autoHideDuration={6000} onClose={handleWRClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleWRClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Could not register with those details.
        </MuiAlert>
      </Snackbar>
      <Snackbar open={sropen} autoHideDuration={6000} onClose={handleSRClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSRClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Registered.
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
}
