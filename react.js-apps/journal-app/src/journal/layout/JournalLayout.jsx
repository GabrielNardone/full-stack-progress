import { Box, Toolbar } from "@mui/material"
import { Navbar } from "../components/Navbar";
import { SideBar } from "../components/SideBar";

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
    return (
        <Box 
        sx={{ display: "flex" }} 
        className="animate__animated animate__fadeIn animate__faster"
        >

            <Navbar drawerWidth={drawerWidth}/>
            <SideBar drawerWidth={drawerWidth}/>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* Toolbar for filling the white space at the top */}
                <Toolbar/>
                {children}
            </Box>
        </Box>
    )
}
