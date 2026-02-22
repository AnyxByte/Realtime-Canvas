import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "./pages/Auth.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Board } from "./pages/Excelboard.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext.jsx";
import { DocProvider } from "./context/DocContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: (
      <UserProvider>
        <DocProvider>
          <Dashboard />
        </DocProvider>
      </UserProvider>
    ),
  },
  {
    path: "/board/:id",
    element: <Board />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
);
