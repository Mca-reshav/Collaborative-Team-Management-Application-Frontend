import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Project from "./components/Project";
import Task from "./components/Task";
import Activity from "./components/Activity";
import Kanban from "./components/Kanban";
import Home from "./components/Home";
import TeamMember from "./components/TeamMember";
import UserProfile from "./components/User";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskSpecific from "./components/TaskSpecific";
import ProjectSpecific from "./components/ProjectSpecific";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project" element={<ProtectedRoute><Project /></ProtectedRoute>} />
        <Route path="/task" element={<ProtectedRoute><Task/></ProtectedRoute>} />
        <Route path="/activity" element={<ProtectedRoute><Activity/></ProtectedRoute>} />
        <Route path="/members" element={<TeamMember />} />
        <Route path="/members/:empId" element={<UserProfile />} />
        <Route path="/projectSpecific/:projectId" element={<ProjectSpecific />} />
        <Route path="/taskSpecific/:taskId" element={<TaskSpecific />} />
        <Route
          path="/kanban"
          element={
            <React.StrictMode>
              <Kanban />
            </React.StrictMode>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
