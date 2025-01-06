const { toast } = require("react-toastify");
const {
  getProjectCount,
  getTaskCount,
  getMemberCount,
  closeToDueDate,
  recentActivity
} = require("../Routes/dashRoutes");

const fetchData = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getProjectCount = async () => {
  try {
    const response = await fetchData(getProjectCount);
    if (!response.ok) throw new Error("Failed to get Project Count");
    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.getTaskCount = async () => {
  try {
    const response = await fetchData(getTaskCount);
    if (!response.ok) throw new Error("Failed to get Task Count");
    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.getMemberCount = async () => {
  try {
    const response = await fetchData(getMemberCount);
    if (!response.ok) throw new Error("Failed to get Member Count");
    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.closeToDueDate = async () => {
  try {
    const response = await fetchData(closeToDueDate);
    if (!response.ok) throw new Error("Failed to get Member Count");
    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};

exports.recentActivityData = async () => {
  try {
    const response = await fetchData(recentActivity);
    if (!response.ok) throw new Error("Failed to get Member Count");
    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};
