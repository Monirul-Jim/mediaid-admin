import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/MainRouter.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </>
  // {/* </React.StrictMode>, */}
);
