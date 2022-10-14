import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";

export default function Menubar({
  handleTargetChange,
  handleProfile,
  handleBio,
  token,
  setToken
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const signOut = () => {
    setToken(null);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Resource Manager
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleBio(
                  <Stack spacing={2}>
                    <Card>
                      <CardContent>
                        <Stack spacing={2} direction="row">
                          <CalendarMonthIcon />
                          {token.dob}
                        </Stack>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent>
                        <Stack spacing={2} direction="row">
                          <EmailIcon />
                          {token.email}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>,
                  token.name
                );
                handleProfile();
                handleClose();
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleTargetChange([token.name, token.id]);
                handleClose();
              }}
            >
              My Tasks
            </MenuItem>
            <MenuItem onClick={signOut}>Sign out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
