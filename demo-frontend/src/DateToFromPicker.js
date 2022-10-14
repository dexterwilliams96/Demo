import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function DateToFromPicker() {
  const [from, setFrom] = React.useState(dayjs());
  const [to, setTo] = React.useState(dayjs());

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
          inputFormat="MM/DD/YYYY H:m:s"
        />
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="To"
          value={to}
          onChange={(newTo) => {
            setTo(newTo);
          }}
          inputFormat="MM/DD/YYYY H:m:s"
        />
        <Button variant="outlined">Submit</Button>
      </Stack>
    </LocalizationProvider>
  );
}
