import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TodayIcon from "@mui/icons-material/Today";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

const RESOURCE_API_DEL_TASK = "http://localhost:5000/deleteTask";

export default function TaskTable({
  taskList,
  handleInfo,
  handlePop,
  setChange,
  setDelOpen,
  sendComment,
  token,
  cs,
  changeComments,
}) {
  const [tasks, setTasks] = React.useState(taskList);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  useEffect(() => {
    setComments(cs);
  }, [cs]);

  const deleteTask = (data) => {
    axios
      .post(RESOURCE_API_DEL_TASK, data)
      .then(function (response) {
        console.log(response);
        setChange(true);
        setDelOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
      <Table sx={{ minWidth: 500 }} aria-label="task list">
        <TableHead>
          <TableRow>
            <TableCell align="left">Options</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Start Date</TableCell>
            <TableCell align="left">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                <IconButton
                  aria-label="info"
                  onClick={() => {
                    changeComments(row.id);
                    handleInfo(
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
                                    {row.startDate}
                                  </Stack>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent>
                                  <Stack spacing={2} direction="row">
                                    <EventIcon />
                                    {row.endDate}
                                  </Stack>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent>
                                  <Stack spacing={2} direction="row">
                                    <AssignmentIcon />
                                    {row.content}
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
                                        setComment(e.target.value)
                                      }
                                    />
                                    <IconButton
                                      aria-label="submit"
                                      onClick={() => {
                                        sendComment({
                                          content: comment,
                                          date_posted:
                                            new Date().toLocaleString(),
                                          task_id: row.id,
                                          employee_id: token.id,
                                        });
                                      }}
                                    >
                                      <PublishIcon />
                                    </IconButton>
                                  </Stack>
                                </CardContent>
                              </Card>
                            </Stack>
                          </CardContent>
                          <Card>
                          <CardContent>
                          <Typography
                            sx={{ ml: 2, mt: 0.1, mb: 0.1 }}
                            variant="h6"
                          >
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
                                </ListItem>
                              );
                            })}
                          </List>
                          </CardContent>
                          </Card>
                        </Card>
                      </Stack>,
                      row.name
                    );
                    handlePop();
                  }}
                >
                  <InfoIcon />
                </IconButton>
                <IconButton
                  aria-label="del"
                  onClick={() => {
                    deleteTask({ id: row.id });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell
                sx={{
                  ellipsis: {
                    maxWidth: 200,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
                align="left"
              >
                {row.startDate}
              </TableCell>
              <TableCell align="left">{row.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
