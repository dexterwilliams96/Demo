import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from "react";
import { useEffect } from "react";

export default function ProfileDialog({ open, handleClose, text, title }) {
const [bio, setBio] = React.useState("");
const [header, setHeader] = React.useState("");

useEffect(() => {
    setBio(text);
  }, [text]);

  useEffect(() => {
    setHeader(title);
  }, [title]);

return(
     <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="profile-dialog"
      >
        <DialogTitle>{header}</DialogTitle>
        <DialogContent>
          <DialogContentText id="profile-dialog-description">
            {bio}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>);
      }