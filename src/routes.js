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

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />
  },
  {
    path: "/",
    element: <>dfgfgd</>,
    errorElement: <NotFound />
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
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
