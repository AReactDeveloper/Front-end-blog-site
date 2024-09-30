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
import Home from "./Components/Home/templates/base/Home";
import Articles from "./Components/Home/templates/base/Articles/Articles";
import SingleArticle from "./Components/Home/templates/base/SingleArticle/SingleArticle";
import Page404 from "./Components/Home/templates/base/404/Page404";
import Search from "./Components/Home/templates/base/Search/Search";
import SiteInfo from "./Components/Admin/Settings/SiteInfo";
import CategoryView from "./Components/Home/templates/base/CategoryView/CategoryView";
import TagView from "./Components/Home/templates/base/TagView/TagView";
import PageList from "./Components/Admin/Pages/PageList";
import AddPage from "./Components/Admin/Pages/AddPage";
import EditPage from "./Components/Admin/Pages/EditPage";
import AccountSettings from "./Components/Admin/Settings/AccountSettings";
import SinglePage from "./Components/Home/templates/base/SinglePage/SinglePage";


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
      },
      {
        path:'/page/:slug',
        element: <SinglePage />
      },
      {
        path:'/search/:query',
        element: <Search />
      },
      {
        path:'/category/:category',
        element: <CategoryView />
      },
      {
        path:'/tag/:tag',
        element: <TagView />
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
        path: "settings",
        index: true,
        element: <SiteInfo />
      },
      {
        path: "pages",
        children: [
          {
            index: true,
            element: <PageList />
          },
          {
            path: "add",
            element: <AddPage />
          },
          {
            path: "edit/:slug",
            element: <EditPage />
          }
        ]
      },
      {
        path:"settings/account",
        element: <AccountSettings />
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
      }
    ]
  }
]);
