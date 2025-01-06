const { toast } = require("react-toastify");
const { seeActivity } = require("../Routes/dashRoutes");

const fetchData = async (url) => {
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
};

exports.seeActivity = async () => {
  try {
    const response = await fetchData(seeActivity);
    if (!response.ok) throw new Error("Failed to fetch activity");
    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};
