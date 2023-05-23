import React, { useEffect } from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import CreateWorkout from './Components/CreateWorkout/CreateWorkout';
import Home from './Components/Home/Home';
import WOTAppBar from './Components/AppBar/AppBar';
import SignIn from './Components/SignIn/SignIn';

function App() {
  const [username, setUsername] = React.useState("");

  const getUser = async () => {
    const response = await fetch(`http://localhost:5200/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json'
        },
        credentials: 'include'
      });

      const username = await response.json();

      if (!username.message) {
        setUsername(username || "");
      }

  }

  useEffect(() => {
    if (username == "") {
      getUser();
    }

    return;
  });

  const router = createBrowserRouter([
    {
      element: (
        <div>
          <WOTAppBar username={username} />
          <Outlet />
        </div>
      ),
      children: [
        {
        path: "/",
        element: <Home username={username}/>,
        },
        {
          path: "/create",
          element: <CreateWorkout />,
        },
        {
          path: "/signin",
          element: <SignIn setUsername={setUsername} />
        }
      ]
    }
  ]);
  
  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>

  );
}

export default App;
