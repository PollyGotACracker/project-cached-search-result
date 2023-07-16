import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Error from "./pages/Error";

export const Router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Home /> },
        { path: "*", element: <Error /> },
      ],
    },
  ]
  // { basename: process.env.PUBLIC_URL }
);
