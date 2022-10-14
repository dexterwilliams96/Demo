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
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function TaskTable({ tasks, handleInfo, handlePop }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
      <Table sx={{ minWidth: 500 }} aria-label="task list">
        <TableHead>
          <TableRow>
            <TableCell align="left">Details</TableCell>
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
                    handleInfo(
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
                      </Stack>,
                      row.name
                    );
                    handlePop();
                  }}
                >
                  <InfoIcon />
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
