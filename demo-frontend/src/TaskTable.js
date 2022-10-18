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
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect } from "react";

const RESOURCE_API_DEL_TASK = "http://localhost:5000/deleteTask";

export default function TaskTable({
  taskList,
  setChange,
  setDelOpen,
  token,
  changeComments,
}) {
  const [tasks, setTasks] = React.useState(taskList);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

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
                    changeComments(row);
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
