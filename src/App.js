import React from 'react'
import {router} from './routes.js'
import {
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';


export default function App() {

  return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  )
}
