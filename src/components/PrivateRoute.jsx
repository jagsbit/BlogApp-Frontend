import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedin } from '../auth'

const PrivateRoute = () => {
   
   return isLoggedin()?<Outlet/>:<Navigate to={"/login"}/>
}

export default PrivateRoute
