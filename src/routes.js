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
import Articles from "./Components/Home/templates/Layouts/Articles/Articles";


export const router = createBrowserRouter([
  
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children:[
      {
        index:true,
        element: <Articles />
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
            path: 'edit/:id',
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
