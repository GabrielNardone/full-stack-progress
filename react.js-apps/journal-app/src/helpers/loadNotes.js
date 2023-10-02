import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"


export const loadNotes = async(uid = "") => {
    if (!uid) throw new Error("The user id doesn´t exist")   

    //taking the data from firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)

    //taking the data fron docs
    const notes = []
    docs.forEach(docs => {
        notes.push({id: docs.id, ...docs.data()})
    })

    return notes
}