module.exports = {
  baseUrl: "http://localhost:6001/web",
  basics: {
    name: "Collaborative Task Management Application",
    title: "Welcome to Collaborative Task Management Application",
  },
  roles_access: {
    TEAM_MEMBER: "3",
    PROJECT_MANAGER: "2",
    ADMIN: "1",
  },
  warningMsg: {
    ROLE_NOT_FOUND: {
      msg: "role not found",
      respMsg: "Role not found, contact superior",
    },
  },
  commonCellStyles: {
    backgroundColor: "#ff5e00",
    color: "#333",
    fontWeight: "bold",
  },
  buttonStyles: {
    backgroundColor: "#ff5e00",
    color: "#fff",
    marginLeft: "1rem",
    height: "2.5rem",
    marginBottom: "-5px",
  },
  launchIconStyles: {
    marginBottom: "-2px",
    color: "#ff5e00",
    height: "15px",
    marginLeft: "-5px",
  },
  redirectLaunchStyles: {
    color: "#333",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};
