import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';




ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
