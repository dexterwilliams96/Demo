import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FaceIcon from "@mui/icons-material/Face";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import IconButton from '@mui/material/IconButton';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function TeamList() {
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
        {generate(
          <ListItem>
            <ListItemAvatar>
              <IconButton aria-label="profile">
                <FaceIcon />
              </IconButton>
            </ListItemAvatar>
            <ListItemText primary="Single-line item" secondary={null} />
            <Button variant="outlined">Tasks</Button>
          </ListItem>
        )}
      </List>
    </Stack>
  );
}
