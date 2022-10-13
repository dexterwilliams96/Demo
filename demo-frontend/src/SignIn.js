import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import { useEffect } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

export default function RM() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <Card>
            <Stack spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}>
            </Stack>
        </Card>
    </Box>
    );
}