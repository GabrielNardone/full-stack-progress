import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>

        {/* Any other route path leaves me in /auth/login */}
        <Route path='/*' element={<Navigate to="/auth/login"/>}/>


    </Routes>
  )
}
