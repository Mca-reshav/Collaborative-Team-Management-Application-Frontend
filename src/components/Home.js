import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TaskIcon from "@mui/icons-material/Task";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupsIcon from "@mui/icons-material/Groups";
import "./styles/home.css";
import {
  getMemberCount,
  getProjectCount,
  getTaskCount,
  closeToDueDate,
  recentActivityData,
} from "../services/DashService";
import CloseToDueDateTable from "./table/home/CloseToDueDateTable";
import RecentActivityCard from "./table/home/RecentActivity";
// import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
// import { Button } from "@mui/material";
// import { buttonStyles } from "../constants/Common.const";
import AddTaskModal from "./model/AddNewTask";

const Home = () => {
  const navigate = useNavigate();
  const [activeMemberCount, setActiveMemberCount] = useState(0);
  const [inactiveMemberCount, setInactiveMemberCount] = useState(0);

  const [activeProjectCount, setActiveProjectCount] = useState(0);
  const [archivedProjectCount, setArchivedProjectCount] = useState(0);
  const [completedProjectCount, setCompletedProjectCount] = useState(0);

  const [todoTaskCount, setTodoTaskCount] = useState(0);
  const [inprogressTaskCount, setInprogressTaskCount] = useState(0);
  const [doneTaskCount, setDoneTaskCount] = useState(0);
  const [closeToDueTasks, setCloseToDueTasks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (taskData) => {
    console.log("Saving task in Task.js:", taskData);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login"); 
  };

  const fetchProjectsCount = async () => {
    try {
      const getProjectCountData = await getProjectCount();
      if (getProjectCountData && getProjectCountData.success) {
        setActiveProjectCount(getProjectCountData.data.active || 0);
        setArchivedProjectCount(getProjectCountData.data.archived || 0);
        setCompletedProjectCount(getProjectCountData.data.completed || 0);
      } else {
        console.error("Failed to fetch member counts");
      }
    } catch (err) {
      console.error("Error fetching member counts:", err);
    }
  };

  const fetchTasksCount = async () => {
    try {
      const getTaskCountData = await getTaskCount();
      if (getTaskCountData && getTaskCountData.success) {
        setTodoTaskCount(getTaskCountData.data.todo || 0);
        setInprogressTaskCount(getTaskCountData.data.inprogress || 0);
        setDoneTaskCount(getTaskCountData.data.completed || 0);
      } else {
        console.error("Failed to fetch member counts");
      }
    } catch (err) {
      console.error("Error fetching member counts:", err);
    }
  };

  const fetchMembersCount = async () => {
    try {
      const getMemberCountData = await getMemberCount();
      if (getMemberCountData && getMemberCountData.success) {
        setActiveMemberCount(getMemberCountData.data.active || 0);
        setInactiveMemberCount(getMemberCountData.data.inactive || 0);
      } else {
        console.error("Failed to fetch member counts");
      }
    } catch (err) {
      console.error("Error fetching member counts:", err);
    }
  };

  const fetchCloseToDueDate = async () => {
    try {
      const getData = await closeToDueDate();
      if (getData && getData.success) {
        setCloseToDueTasks(getData.data || []);
      } else {
        console.error("Failed to fetch close to due date tasks");
      }
    } catch (err) {
      console.error("Failed to fetch close to due date tasks:", err);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const getData = await recentActivityData();
      if (getData && getData.success) {
        setRecentActivity(getData.data || []);
      } else {
        console.error("Failed to fetch recent activities data");
      }
    } catch (err) {
      console.error("Failed to fetch recent activities data:", err);
    }
  };

  // const handleAddProject = () => {};

  useEffect(() => {
    fetchMembersCount();
    fetchTasksCount();
    fetchProjectsCount();
    fetchCloseToDueDate();
    fetchRecentActivity();
  }, []);

  return (
    <div className="home-container">
      <Navbar onLogout={handleLogout} />
      <div className="dashboard-container">
        <div className="home-top-cards">
          <div className="stat-card project-card">
            <div className="card-header">
              <AccountTreeIcon
                style={{
                  fontSize: "35px",
                  marginTop: "-8px",
                  marginRight: "8px",
                }}
              />
              <span>Projects</span>
            </div>
            <div className="card-body">
              <div className="stat-total">
                <span className="total-count">
                  {activeProjectCount +
                    archivedProjectCount +
                    completedProjectCount}
                </span>
              </div>
              <div className="stat-info">
                <div className="info-item left">
                  <span>Completed</span>
                  <span>{activeProjectCount}</span>
                </div>
                <div className="info-item center">
                  <span>In-progress</span>
                  <span>{archivedProjectCount}</span>
                </div>
                <div className="info-item right">
                  <span>Overdue</span>
                  <span>{completedProjectCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card task-card center-card">
            <div className="card-header">
              <TaskIcon
                style={{
                  fontSize: "35px",
                  marginTop: "-8px",
                  marginRight: "8px",
                }}
              />
              <span>Tasks</span>
            </div>
            <div className="card-body">
              <div className="stat-total">
                <span className="total-count">
                  {todoTaskCount + inprogressTaskCount + doneTaskCount}
                </span>
              </div>
              <div className="stat-info">
                <div className="info-item left">
                  <span>Completed</span>
                  <span>{todoTaskCount}</span>
                </div>
                <div className="info-item center">
                  <span>In-progress</span>
                  <span>{inprogressTaskCount}</span>
                </div>
                <div className="info-item right">
                  <span>Overdue</span>
                  <span>{doneTaskCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card task-card member-card">
            <div className="card-header">
              <GroupsIcon
                style={{
                  fontSize: "35px",
                  marginTop: "-8px",
                  marginRight: "8px",
                }}
              />
              <span>Members</span>
            </div>
            <div className="card-body">
              <div className="stat-total">
                <span className="total-count">
                  {activeMemberCount + inactiveMemberCount}
                </span>
              </div>
              <div className="stat-info">
                <div className="info-item left">
                  <span>Active</span>
                  <span>{activeMemberCount}</span>
                </div>
                <div className="info-item right">
                  <span>Inactive</span>
                  <span>{inactiveMemberCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <h3>Quick Actions</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          gap: 1,
          marginLeft: "1rem",
        }}
      >
        <span>
          Add a new project{" "}
          <Button sx={buttonStyles} onClick={handleAddProject}>
            <AddTwoToneIcon />
          </Button>
        </span>
        &nbsp;
        <span>
          Add a new task{" "}
          <Button sx={buttonStyles} onClick={handleClickOpen}>
            <AddTwoToneIcon />
          </Button>
        </span>
      </div> */}
      <h3 sx={{marginTop: '-2rem'}}>Recent activities</h3>
      <div className="card-row">
        {recentActivity.map((item) => (
          <RecentActivityCard key={item._id} data={item} />
        ))}
      </div>{" "}
      <h3>Tasks close to deadline</h3>
      <CloseToDueDateTable
        tasks={closeToDueTasks}
      />
      <AddTaskModal
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Home;
