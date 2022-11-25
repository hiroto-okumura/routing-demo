import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider, route } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
