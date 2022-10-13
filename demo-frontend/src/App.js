import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Menubar from "./Menubar";
import Menudrawer from "./Menudrawer";
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

const RESOURCE_API_EMPLOYEES_GET = "http://localhost:5000/employees";
const RESOURCE_API_EMPLOYEE_GET = "http://localhost:5000/tasks/";
const RESOURCE_API_TASKS_POST = "http://localhost:5000/newTask";

function App() {
  const [drawOpen, setDrawOpen] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [warnOpen, setWarnOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [target, setTarget] = React.useState(["Dex", 2]);
  const [intarget, setInTarget] = React.useState(["Dex", 2]);
  const [alert, setAlert] = React.useState("Dex");
  const [newtask, setNewTask] = React.useState({});

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    getTasks();
  }, [intarget]);

  useEffect(() => {
    setTarget(intarget);
  }, [tasks]);

  useEffect(() => {
    sendTask(newtask)
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
        setAlert(intarget[0]);
        setWarnOpen(true);
      });
  };

  const sendTask = () => {
    axios
      .post(RESOURCE_API_TASKS_POST, newtask)
      .then(function (response) {
        console.log(response)
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

  const handleDrawerChange = () => {
    setDrawOpen(!drawOpen);
  };

  const handleTextChange = (text, title) => {
    setText(text);
    setTitle(title);
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
        handleDrawerChange={handleDrawerChange}
        handleTargetChange={handleTargetChange}
        user={{ name: "Dex", bio: "SWE" }}
        handleProfile={handleClickOpen}
        handleBio={handleTextChange}
      />
      <Box>
        <Menudrawer
          items={items}
          drawOpen={drawOpen}
          handleDrawerChange={handleDrawerChange}
        />
      </Box>
      <div className="App" style={{ padding: 30 }}>
        <ProfileDialog
          open={open}
          handleClose={handleClose}
          text={text}
          title={title}
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
                      <TaskTable tasks={tasks} />
                    </Stack>
                        <TaskCreator sendTask={handleTaskChange} users={employees}/>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <TeamList
                    handleProfile={handleClickOpen}
                    handleBio={handleTextChange}
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
    </Box>
  );
}

export default App;
