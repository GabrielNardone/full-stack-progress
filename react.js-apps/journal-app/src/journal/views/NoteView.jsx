import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNotes, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css"

export const NoteView = () => {

    const dispatch = useDispatch()
    const { active: activeNote, messageSaved, isSaving } = useSelector(state => state.journal)
    const { body, title, onInputChange, formState, date } = useForm(activeNote)

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef()

    const onSaveNote = () => {
        dispatch(startSaveNotes())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire("Good", messageSaved, "success")
        }
    }, [messageSaved])


    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])


    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
            className="animate__animated animate__fadeIn animate__faster"
        >

            <Grid item>
                <Typography fontSize={39} fontWeight="light">
                    {dateString}
                </Typography>
            </Grid>

            <Grid item>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: "none" }}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Enter a title"
                    label="Title"
                    sx={{ border: "none", mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Enter a title"
                    label="What happened today?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button
                    onClick={onDelete}
                    sx={{mt: 2}}
                    color="error"
                >
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid>

            <ImageGallery images={activeNote.imageUrls} />

        </Grid>
    )
}
