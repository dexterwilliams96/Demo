import * as React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Menubar from "./Menubar";
import Menudrawer from "./Menudrawer";
import Grid from "@mui/material/Grid";
import DateToFromPicker from "./DateToFromPicker";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TaskTable from "./TaskTable";
import TeamList from "./TeamList";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function App() {
  const [drawOpen, setDrawOpen] = React.useState(true);

  const handleDrawerChange = () => {
    setDrawOpen(!drawOpen);
  };

  const items = ["Home", "Settings"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menubar handleDrawerChange={handleDrawerChange} />
      <Box component="nav">
        <Menudrawer
          items={items}
          drawOpen={drawOpen}
          handleDrawerChange={handleDrawerChange}
        />
      </Box>
      <div className="App" style={{ padding: 30 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={10} justify="center">
            <Grid item xs={8}>
              <Card sx={{ minWidth: 50 }}>
                <CardContent>
                  <Stack
                    spacing={2}
                    divider={<Divider orientation="horizontal" flexItem />}
                  >
                    <Typography
                      sx={{ mt: 4, mb: 2 }}
                      variant="h6"
                    >
                      My Tasks
                    </Typography>
                    <Stack
                      spacing={2}
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <DateToFromPicker />
                      <TaskTable />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <TeamList />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
}

export default App;
