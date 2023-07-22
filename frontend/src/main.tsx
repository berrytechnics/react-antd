import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { CookiesProvider } from "react-cookie";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import CustomTheme from "./components/CustomTheme";
import "./index.css";


const router = createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path:'/index',
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <ConfigProvider theme={CustomTheme}>
          <RouterProvider router={router} />
      </ConfigProvider>
    </CookiesProvider>
  </React.StrictMode>
);
