import React from 'react'
import {router} from './routes.js'
import {
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import { ArticleProvider } from './context/ArticleContext.jsx';
import { SiteInfoProvider } from './context/SiteInfoContext.jsx';
import { PageProvider } from './context/PageContext.jsx';


export default function App() {

  
  return (
    <AuthProvider>
    <SiteInfoProvider>
      <ArticleProvider>
        <PageProvider>
          <RouterProvider router={router} />
        </PageProvider>
      </ArticleProvider>
    </SiteInfoProvider>
  </AuthProvider>
  )
}
