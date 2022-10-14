import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

export default function Register() {
  const [dob, setDob] = React.useState(dayjs("2022-04-07"));
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
                  Register:
                </Typography>
                <TextField id="username" label="Username" variant="standard" />
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                />
                <TextField id="email" label="Email" variant="standard" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="MM/DD/YYYY"
                    renderInput={(props) => <TextField {...props} />}
                    label="DatePicker"
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                    }}
                  />
                </LocalizationProvider>
                <IconButton>
                  <HowToRegIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Grow>
      </Grid>
    </Grid>
  );
}
