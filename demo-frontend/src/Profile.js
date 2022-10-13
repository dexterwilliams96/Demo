import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FaceIcon from "@mui/icons-material/Face";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

export default function Profile({
  handleBio,
  handleProfile,
  employee,
  handleTargetChange,
}) {
  return (
    <ListItem>
      <ListItemAvatar>
        <IconButton
          aria-label="profile"
          onClick={() => {
            handleBio(
              <Stack spacing={2}>
                <Card>
                  <CardContent>
                    <Stack
                      spacing={2}
                      direction="row"
                    >
                      <CalendarMonthIcon />
                      {employee.dob}
                    </Stack>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Stack
                      spacing={2}
                      direction="row"
                    >
                      <EmailIcon />
                      {employee.email}
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>,
              employee.name
            );
            handleProfile();
          }}
        >
          <FaceIcon />
        </IconButton>
      </ListItemAvatar>
      <ListItemText primary={employee.name} secondary={null} />
      <Button
        variant="outlined"
        onClick={() => {
          handleTargetChange([employee.name, employee.id]);
        }}
      >
        Tasks
      </Button>
    </ListItem>
  );
}
