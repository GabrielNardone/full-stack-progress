import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SideBarItem = ({title = "", id, date, body, imageUrls = []}) => {

    const dispatch = useDispatch()

    const handleActiveNote = () => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}))
    }


    return (
        <ListItem disablePadding onClick={() => handleActiveNote()}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>

                <Grid container>
                    <ListItemText primary={title} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
