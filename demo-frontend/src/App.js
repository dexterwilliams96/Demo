import * as React from "react";
import './App.css';
import Box from '@mui/material/Box';
import Menubar from "./Menubar"
import Menudrawer from "./Menudrawer"

function App() {

  const [drawOpen, setDrawOpen] = React.useState(false);



  const handleDrawerChange = () => {
    setDrawOpen(!drawOpen);
  };

  const items = ["Home", "Settings"];
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="App">
    <Box sx={{ flexGrow: 1 }}>
    <Menubar handleDrawerChange={handleDrawerChange} items={items}/>
    <Box component="nav">
    <Menudrawer items={items} drawOpen={drawOpen} handleDrawerChange={handleDrawerChange}/>
    </Box>
    <Box>
    Hello world
    </Box>
    </Box>
    </div>
  );
}

export default App;
