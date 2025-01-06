const { toast } = require("react-toastify");
const { list } = require("../Routes/userRoutes");

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

    if (!response.ok) {
      throw new Error("Failed to fetch the list");
    }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};
