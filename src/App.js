import React from 'react'
import {router} from './routes.js'
import {
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import { ArticleProvider } from './context/ArticleContext.jsx';


export default function App() {

  return (
      <AuthProvider>
        <ArticleProvider>
          <RouterProvider router={router} />
        </ArticleProvider>
      </AuthProvider>
  )
}
