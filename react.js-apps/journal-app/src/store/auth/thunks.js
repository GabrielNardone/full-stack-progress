import { loginWithEmailAndPassword, logoutFirebase, registerUser, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./"


export const checkingAuthentication = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const result = await signInWithGoogle()
        if (!result.ok) return dispatch(logout(result.errorMessage)) 

        dispatch(login(result))
    }
}

export const startRegisteringUser = ({email, password, displayName}) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUser({email, password, displayName})
        
        if (!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLoginWithEmailAndPassword = ({email, password}) => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

        const resp = await loginWithEmailAndPassword({email, password})

        if (!resp.ok) return dispatch(logout(resp))

        dispatch(login(resp))
    }
}

export const starLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch(clearNotesLogout())
        dispatch(logout())
    }
}