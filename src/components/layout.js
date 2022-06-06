import { Box } from "@mui/material";
import { Outlet, Link } from "react-router-dom"
import Navbar from "./navbar";

export default function Layout() {
    return (
        <div>
            <Navbar />
            {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
            <Box sx={{
                padding:1
            }}>
                <Outlet />
            </Box>
        </div>
    );
}
