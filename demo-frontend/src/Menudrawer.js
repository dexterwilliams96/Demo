import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function Menudrawer({ items, drawOpen, handleDrawerChange }) {
  const [open, setOpen] = React.useState(drawOpen)

  useEffect(() => {
    setOpen(drawOpen);
  }, [drawOpen]);

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={handleDrawerChange}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
      }}
    >
      <Box onClick={handleDrawerChange} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Options
        </Typography>
        <Divider />
        <List>
          {items.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
