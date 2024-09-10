import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import {
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./Pages/NotFound";
import MainArea from "./Components/Admin/Dashboard/MainArea";
import Posts from "./Components/Admin/Posts/Posts";
import List from "./Components/Admin/Posts/L.ist";
import Add from "./Components/Admin/Posts/Add";
import Login from "./Components/Home/Login";
import ProtectedRoute from "./Utils/ProtectedRoute";
import CategoryList from "./Components/Admin/Posts/CategoryList";
import TagList from "./Components/Admin/Posts/TagList";
import Edit from "./Components/Admin/Posts/Edit";
import Home from "./Components/Home/templates/Home";
import Articles from "./Components/Home/templates/base/Articles/Articles";
import SingleArticle from "./Components/Home/templates/base/SingleArticle/SingleArticle";
import Page404 from "./Components/Home/templates/base/404/Page404";


export const router = createBrowserRouter([
  
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <Page404 />,
    children:[
      {
        index:true,
        element: <Articles />
      },
      {
        path:'/article/:slug',
        element: <SingleArticle />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute ><Dashboard /></ProtectedRoute>,
    children: [
      {
        index:true,
        element: <MainArea />
      },
      {
        path: "posts",
        element: <Posts />,
        children: [
          {
            index: true,
            element: <List />
          },
          {
            path: 'add',
            element: <Add />
          },
          {
            path: 'edit/:slug',
            element: <Edit />
          },
          {
            path: 'categories',
            element: <CategoryList />
          },
          {
            path: 'tags',
            element: <TagList />
          }
        ]
      },
      {
        path: "pages",
        element: <>Pages</>
      }
    ]
  }
]);
