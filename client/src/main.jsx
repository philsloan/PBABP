import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Home from './pages/Home';
import Signup from './pages/signUp.jsx';
import Error from "./pages/Error";
import Profile from "./pages/profile.jsx";
import SingleProject from "./pages/post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/myprofile",
        element: <Profile />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/project/:projectId",
        element: <SingleProject />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
