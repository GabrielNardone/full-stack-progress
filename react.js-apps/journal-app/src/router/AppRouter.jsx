import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal/thunks';

export const AppRouter = () => {

  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }))
      dispatch(startLoadingNotes())
    })
  }, [])


  if (status === "checking") {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        (status === "authenticated")
          ? <Route path='/*' element={<JournalRoutes />} />
          : <Route path='/auth/*' element={<AuthRoutes />} />
      }

      <Route path='/*' element={<Navigate to="/auth/login"/>} />

      {/* Login and register */}
      {/* Any path that enter auth will show AuthRoutes */}
      {/* <Route path='/auth/*' element={<AuthRoutes/>} /> */}

      {/* Journal App */}
      {/* Any other route that isn´t /auth will show this */}
      {/* <Route path='/*' element={<JournalRoutes/>} /> */}

    </Routes>
  )
}
