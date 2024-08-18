import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import {
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./Pages/NotFound";
import MainArea from "./Components/Admin/Dashboard/MainArea";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <>home</>,
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
        element: <>Posts</>
      },
      {
        path: "pages",
        element: <>Pages</>
      }
    ]
  }
]);
