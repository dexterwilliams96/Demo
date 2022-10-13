import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import LoginIcon from '@mui/icons-material/Login';
import Box from "@mui/material/Box";

export default function RM() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <Card>
            <Stack
                      spacing={2}
                      divider={<Divider orientation="horizontal" flexItem />}
                    >
            <TextField
              id="username"
              label="Username"
              variant="standard"
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
            />
            <IconButton
      >
        <LoginIcon/>
      </IconButton>
      </Stack>
        </Card>
    </Box>
    );
}