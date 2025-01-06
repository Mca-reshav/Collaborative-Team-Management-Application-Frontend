const { toast } = require("react-toastify");
const { addProject, list, listActiveMembers, updateProject, deleteProject, getListSpecific } = require("../Routes/projectRoutes");

const fetchData = async (url, formData, method) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  console.log(formData)
  return await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(userId && { "X-User-ID": userId }),
    },
    body: JSON.stringify(formData),
  });
};

exports.addProject = async (formData) => {
  try {
    const response = await fetchData(addProject, formData, 'POST');
    if (!response.ok) throw new Error("Failed to add Project");
    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.getList = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(list, {
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

exports.getActiveMembers = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(listActiveMembers, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
    });

    // if (!response.ok) {
    //   throw new Error("Failed to fetch the active members list");
    // }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
}

exports.updateProject = async (formData) => {
  try {
    const response = await fetchData(updateProject, formData, 'PUT');
    if (!response.ok) throw new Error("Failed to update project");
    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.deleteProject = async (formData) => {
  try {
    const response = await fetchData(deleteProject, formData, 'POST');
    if (!response.ok) throw new Error("Failed to delete project");
    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.getListSpecificData = async (projectId) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(`${getListSpecific}/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
    });

    if (response.ok) return response.json();
    else if (!response.ok) return false;
    else throw new Error("Failed to load project specific");

  } catch (err) {
    console.error(err?.message || "An error occurred");
  }
};