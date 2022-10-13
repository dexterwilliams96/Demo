import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FaceIcon from "@mui/icons-material/Face";
import Button from "@mui/material/Button";

export default function Profile({ handleBio, handleProfile, employee, handleTargetChange }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <IconButton
          aria-label="profile"
          onClick={() => {
            handleBio(employee.bio, employee.name);
            handleProfile();
          }}
        >
          <FaceIcon />
        </IconButton>
      </ListItemAvatar>
      <ListItemText primary={employee.name} secondary={null} />
      <Button variant="outlined" onClick={() => {
            handleTargetChange([employee.name, employee.id]);
          }}>Tasks</Button>
    </ListItem>
  );
}
