import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Menubar from "./Menubar";
import Grid from "@mui/material/Grid";
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
import Slide from "@mui/material/Slide";
import PublishIcon from "@mui/icons-material/Publish";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import TodayIcon from "@mui/icons-material/Today";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import IconButton from "@mui/material/IconButton";
import useDidMountEffect from "./useDidMountEffect";
import DeleteIcon from "@mui/icons-material/Delete";

const RESOURCE_API_EMPLOYEES_GET = "http://localhost:5000/employees";
const RESOURCE_API_EMPLOYEE_GET_NAME = "http://localhost:5000/employees/";
const RESOURCE_API_EMPLOYEE_GET = "http://localhost:5000/tasks/";
const RESOURCE_API_TASKS_POST = "http://localhost:5000/newTask";
const RESOURCE_API_COMMENT_POST = "http://localhost:5000/addCommentToTask";
const RESOURCE_API_COMMENTS = "http://localhost:5000/getComments/";
const RESOURCE_API_DEL_COMMENT = "http://localhost:5000/deleteComment";

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
  const [newcomment, setNewComment] = React.useState({});
  const [sendnewcomment, setSendNewComment] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const [delopen, setDelOpen] = React.useState(false);
  const [addopen, setAddOpen] = React.useState(false);
  const [changeComments, setChangeComments] = React.useState(null);
  const [comments, setComments] = React.useState([]);

  const handleDelClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDelOpen(false);
  };
  const handleAddClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAddOpen(false);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    if (intarget[1] !== -1) {
      getTasks();
    } else {
      getTasksName();
    }
  // eslint-disable-next-line
  }, [intarget]);

  // eslint-disable-next-line
  useEffect(() => {
    setTarget(intarget);
  // eslint-disable-next-line
  }, [tasks]);

  useDidMountEffect(() => {
    if (change) {
      getTasks();
      setChange(false);
    }
  }, [change]);

  useDidMountEffect(() => {
    sendComment();
  }, [sendnewcomment]);

  useDidMountEffect(() => {
    if (changeComments) {
      getComments();
    }
  }, [changeComments]);

  useDidMountEffect(() => {
    handleTextChangeT(
      <Stack
        spacing={2}
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Card>
                <CardContent>
                  <Stack spacing={2} direction="row">
                    <TodayIcon />
                    {changeComments.startDate}
                  </Stack>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Stack spacing={2} direction="row">
                    <EventIcon />
                    {changeComments.endDate}
                  </Stack>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Stack spacing={2} direction="row">
                    <AssignmentIcon />
                    {changeComments.content}
                  </Stack>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Stack spacing={2} direction="row">
                    <TextField
                      id="comment"
                      label="Enter Comment"
                      variant="standard"
                      onChange={(e) =>
                        setNewComment({
                          content: e.target.value,
                          date_posted: new Date().toLocaleString(),
                          task_id: changeComments.id,
                          employee_id: token.id,
                        })
                      }
                    />
                    <IconButton
                      aria-label="submit"
                      onClick={() => {
                        setSendNewComment(!sendnewcomment);
                      }}
                    >
                      <PublishIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography sx={{ ml: 2, mt: 0.1, mb: 0.1, mr: 2 }} variant="h6">
                Comments:
              </Typography>
              <List sx={{ maxHeight: 300, overflow: "auto" }}>
                {comments.map((comment) => {
                  return (
                    <ListItem>
                      <ListItemText
                        primary={comment.content}
                        secondary={comment.date_posted}
                      />
                      <IconButton
                        aria-label="del"
                        onClick={() => {
                          deleteComment({ comment_id: comment.comment_id });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
      </Stack>,
      changeComments.name
    );
    handleClickOpenT();
  }, [comments]);

  useDidMountEffect(() => {
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
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setAlert(intarget[0]);
        setWarnOpen(true);
      });
  };

  const getComments = () => {
    axios
      .get(RESOURCE_API_COMMENTS + changeComments.id)
      .then(function (response) {
        console.log(response);
        setComments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendTask = () => {
    axios
      .post(RESOURCE_API_TASKS_POST, newtask)
      .then(function (response) {
        console.log(response);
        setChange(true);
        setAddOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendComment = () => {
    axios
      .post(RESOURCE_API_COMMENT_POST, newcomment)
      .then(function (response) {
        console.log(response);
        setAddOpen(true);
        if (changeComments) {
          getComments();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteComment = (data) => {
    axios
      .post(RESOURCE_API_DEL_COMMENT, data)
      .then(function (response) {
        console.log(response);
        setDelOpen(true);
        if (changeComments) {
          getComments();
        }
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
    getComments();
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
    setChangeComments(null);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menubar
        handleTargetChange={handleTargetChange}
        handleProfile={handleClickOpen}
        handleBio={handleTextChange}
        token={token}
        setToken={setToken}
      />
      <Box></Box>
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
                        <TaskTable
                          taskList={tasks}
                          setChange={setChange}
                          setDelOpen={setDelOpen}
                          token={token}
                          changeComments={setChangeComments}
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
            <Snackbar
              open={delopen}
              autoHideDuration={6000}
              onClose={handleDelClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleDelClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Content deleted.
              </MuiAlert>
            </Snackbar>
            <Snackbar
              open={addopen}
              autoHideDuration={6000}
              onClose={handleAddClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleAddClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Content added.
              </MuiAlert>
            </Snackbar>
          </Box>
        </div>
      </Slide>
    </Box>
  );
}
