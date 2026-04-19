import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/Root";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { CourseBuilder } from "./components/CourseBuilder";
import { SessionHub } from "./components/SessionHub";
import { TalentBoard } from "./components/TalentBoard";
import { Pipeline } from "./components/Pipeline";
import { MyProfile } from "./components/MyProfile";

export const router = createBrowserRouter([
  { path: "/", Component: Login },
  {
    Component: Root,
    children: [
      { path: "/dashboard", Component: Dashboard },
      { path: "/course-builder", Component: CourseBuilder },
      { path: "/session-hub", Component: SessionHub },
      { path: "/talent-board", Component: TalentBoard },
      { path: "/pipeline", Component: Pipeline },
      { path: "/profile", Component: MyProfile },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
