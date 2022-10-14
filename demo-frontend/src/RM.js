import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Menubar from "./Menubar";
import Grid from "@mui/material/Grid";
import DateToFromPicker from "./DateToFromPicker";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TaskTable from "./TaskTable";
import TeamList from "./TeamList";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProfileDialog from "./ProfileDialog";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TaskCreator from "./TaskCreator";
import { Link } from "react-router-dom";
import Slide from '@mui/material/Slide';

const RESOURCE_API_EMPLOYEES_GET = "http://localhost:5000/employees";
const RESOURCE_API_EMPLOYEE_GET_NAME = "http://localhost:5000/employees/";
const RESOURCE_API_EMPLOYEE_GET = "http://localhost:5000/tasks/";
const RESOURCE_API_TASKS_POST = "http://localhost:5000/newTask";

export default function RM({ token, setToken }) {
  const [open, setOpen] = React.useState(false);
  const [opent, setOpenT] = React.useState(false);
  const [warnOpen, setWarnOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [textt, setTextT] = React.useState("");
  const [titlet, setTitleT] = React.useState("");
  const [target, setTarget] = React.useState([token.name, token.id]);
  const [intarget, setInTarget] = React.useState([token.name, token.id]);
  const [alert, setAlert] = React.useState("Dex");
  const [newtask, setNewTask] = React.useState({});

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    if(intarget[1] !== -1) {
        getTasks();
    }
    else {
        getTasksName();
    }
  }, [intarget]);

  useEffect(() => {
    setTarget(intarget);
  }, [tasks]);

  useEffect(() => {
    sendTask(newtask);
  }, [newtask]);

  const getEmployees = () => {
    axios
      .get(RESOURCE_API_EMPLOYEES_GET)
      .then(function (response) {
        setEmployees(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTasks = () => {
    axios
      .get(RESOURCE_API_EMPLOYEE_GET + intarget[1])
      .then(function (response) {
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTasksName = () => {
    axios
      .get(RESOURCE_API_EMPLOYEE_GET_NAME + intarget[0])
      .then(function (response) {
        console.log(response.data)
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setAlert(intarget[0]);
        setWarnOpen(true);
      });
  };

  const sendTask = () => {
    axios
      .post(RESOURCE_API_TASKS_POST, newtask)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleTargetChange = (val) => {
    setInTarget(val);
  };

  const handleTaskChange = (val) => {
    setNewTask(val);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenT = () => {
    setOpenT(true);
  };

  const handleCloseT = () => {
    setOpenT(false);
  };

  const handleTextChange = (text, title) => {
    setText(text);
    setTitle(title);
  };

  const handleTextChangeT = (tx, t) => {
    setTextT(tx);
    setTitleT(t);
  };

  const handleWarnClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWarnOpen(false);
  };

  const items = ["Home", "Settings"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menubar
        handleTargetChange={handleTargetChange}
        user={{ name: "Dex", bio: "SWE" }}
        handleProfile={handleClickOpen}
        handleBio={handleTextChange}
        token={token}
      />
      <Box>
      </Box>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={500}>
      <div className="App" style={{ padding: 30 }}>
        <ProfileDialog
          open={open}
          handleClose={handleClose}
          text={text}
          title={title}
        />
        <ProfileDialog
          open={opent}
          handleClose={handleCloseT}
          text={textt}
          title={titlet}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={10} justify="center">
            <Grid item xs={8}>
              <Card sx={{ minWidth: 50 }}>
                <CardContent>
                  <Stack
                    spacing={2}
                    divider={<Divider orientation="horizontal" flexItem />}
                  >
                    <Typography sx={{ mt: 0.1, mb: 0.1 }} variant="h6">
                      Tasks for {target[0]}
                    </Typography>
                    <Stack
                      spacing={2}
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <DateToFromPicker />
                      <TaskTable
                        handleInfo={handleTextChangeT}
                        handlePop={handleClickOpenT}
                        tasks={tasks}
                      />
                    </Stack>
                    <TaskCreator
                      sendTask={handleTaskChange}
                      users={employees}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <TeamList
                    handleProfile={handleClickOpenT}
                    handleBio={handleTextChangeT}
                    employees={employees}
                    handleTargetChange={handleTargetChange}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Snackbar
            open={warnOpen}
            autoHideDuration={6000}
            onClose={handleWarnClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleWarnClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Could not find an employee called {alert}.
            </MuiAlert>
          </Snackbar>
        </Box>
      </div>
      </Slide>
    </Box>
  );
}
