import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptyNote, deleteNoteById, noteUpdated, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from "../../helpers/fileUpload"


export const starNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote())

        const { uid } = getState().auth

        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime()
        }

        //reference to the document where I want to add a note
        //inside doc there is the collection, I pass it the DB variables and then de path
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        //To insert the doc I pass the where and then the what to setDoc
        await setDoc(newDoc, newNote)

        //creating the id property for newNote
        newNote.id = newDoc.id

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        if (!uid) throw new Error("The user id doesn´t exist")

        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))

    }
}

export const startSaveNotes = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving())

        const { uid } = getState().auth
        const { active: activeNote } = getState().journal

        const noteToFirestore = { ...activeNote }
        delete noteToFirestore.id

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
        await setDoc(docRef, noteToFirestore, { merge: true })

        dispatch(noteUpdated(activeNote))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises)
        dispatch(setPhotosToActiveNote(photosUrls))
    }
    
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        const { active: activeNote } = getState().journal

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
        await deleteDoc(docRef)

        dispatch(deleteNoteById(activeNote.id))
    }
}