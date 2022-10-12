import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import IconButton from '@mui/material/IconButton';
import Profile from "./Profile"

export default function TeamList({ handleProfile, handleBio, employees }) {
  return (
    <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6">
        Employees
      </Typography>
      <Stack spacing={1} direction="row">
          <TextField id="standard-basic" label="Find Employee" variant="standard" />
          <IconButton aria-label="search">
            <PersonSearchIcon />
          </IconButton>
      </Stack>
      <List>
      {employees.map(employee => {
          return (
            <Profile handleProfile={handleProfile} handleBio={handleBio} employee={employee}/>
          );
        })}
      </List>
    </Stack>
  );
}
