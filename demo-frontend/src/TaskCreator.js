import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import EmployeeDialog from "./EmployeeDialog";

const steps = [
  "Write Task Name",
  "Write Task Contents",
  "Select Start Date",
  "Select End Date",
  "Select User",
];

export default function TaskCreator({ sendTask, users }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [from, setFrom] = React.useState(dayjs("2022-04-07"));
  const [to, setTo] = React.useState(dayjs("2022-04-07"));
  const [tf, setTf] = useState("Enter Name");
  const [tf2, setTf2] = useState("Enter Content");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(-1);

  const handleDialog = () => {
    setOpen(true);
  };

  const closeDialog = (val) => {
    setOpen(false);
    setUser(val);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    sendTask({
      user_id: user,
      name: tf,
      content: tf2,
      start_date: to,
      end_date: from,
    });
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <EmployeeDialog onClose={closeDialog} open={open} users={users} />
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} sx={{ margin: 1 }} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Details Filled Out.</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Submit</Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 0 ? (
        <React.Fragment>
          <TextField
            label={tf}
            multiline
            rows={1}
            onChange={(e) => setTf(e.target.value)}
          />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 1 ? (
        <React.Fragment>
          <TextField
            label={tf2}
            multiline
            rows={2}
            onChange={(e) => setTf2(e.target.value)}
          />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 2 ? (
        <React.Fragment>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              inputFormat="MM/DD/YYYY H:m:s"
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={from}
              onChange={(newValue) => {
                setFrom(newValue);
              }}
            />
          </LocalizationProvider>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 3 ? (
        <React.Fragment>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="DateTimePicker"
              value={to}
              onChange={(newValue) => {
                setTo(newValue);
              }}
              inputFormat="MM/DD/YYYY H:m:s"
            />
          </LocalizationProvider>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button color="inherit" onClick={handleDialog} sx={{ mr: 1 }}>
            Select User
          </Button>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button disabled={user === -1} onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
