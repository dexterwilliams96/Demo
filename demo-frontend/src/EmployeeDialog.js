import FaceIcon from "@mui/icons-material/Face";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function EmployeeDialog({ onClose, open, users }) {

  const handleClose = () => {
    onClose(-1);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select User for Task</DialogTitle>
      <List sx={{ pt: 0 }}>
        {users.map((user) => (
          <ListItem button onClick={() => handleListItemClick(user.id)} key={user.id}>
            <ListItemAvatar>
              <Avatar>
                <FaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}