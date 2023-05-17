import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Exercise from './Components/Exercises/Exercises';
import WOTDrawer from './Components/Drawer/WOTDrawer';
import CreateWorkout from './Components/CreateWorkout/CreateWorkout';
import WorkoutAccordion from './Components/WorkoutCard/WorkoutCard';
import WorkoutCards from './Components/WorkoutCard/WorkoutCards';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <WorkoutCards />,
  },
  {
    path: "/create",
    element: <CreateWorkout />,
  },
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
