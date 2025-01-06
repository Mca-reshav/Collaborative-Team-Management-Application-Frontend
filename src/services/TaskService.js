const { toast } = require("react-toastify");
const {
  getList,
  getKanban,
  getActiveProject,
  createTask,
  updateTask,
  deleteTask,
  assignTask,
  listAvailableUsers,
  getListSpecific,
  moveTask,
} = require("../Routes/taskRoutes");

exports.getList = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(getList, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
    });

    // if (!response.ok) {
    //   throw new Error("Failed to fetch the list");
    // }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.addTask = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(createTask, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the list");
    }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.getKanbanData = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(getKanban, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the kanban");
    }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.getActiveProjects = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(getActiveProject, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the active project");
    }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.updateTaskData = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(updateTask, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the active project");
    }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.deleteTaskData = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(deleteTask, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the active project");
    }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.assignTask = async (taskId, memberId) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log({taskId:taskId, userId:memberId})  
    const response = await fetch(assignTask, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
      body: JSON.stringify({taskId:taskId, userId:memberId}),
    });

    if (!response.ok) {
      throw new Error("Failed to assign task");
    }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.listAvailableUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(listAvailableUsers, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
    });

    // if (!response.ok) {
    //   throw new Error("Failed to fetch the available users list");
    // }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.getListSpecificData = async (taskId) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(`${getListSpecific}/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
    });

    if (response.ok) return response.json();
    else if (!response.ok) return false;
    else throw new Error("Failed to load task specific");

  } catch (err) {
    console.error(err?.message || "An error occurred");
  }
};

exports.moveTaskToNext = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(moveTask, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to move the task");
    }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};