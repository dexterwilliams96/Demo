import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function DateToFromPicker() {
  const [from, setFrom] = React.useState(null);
  const [to, setTo] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="From:"
          value={from}
          onChange={(newFrom) => {
            setFrom(newFrom);
          }}
        />
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="To"
          value={to}
          onChange={(newTo) => {
            setTo(newTo);
          }}
        />
        <Button variant="outlined">Submit</Button>
      </Stack>
    </LocalizationProvider>
  );
}
