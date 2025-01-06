const { toast } = require("react-toastify");
const { login } = require("../Routes/userRoutes");

exports.login = async (userData) => {
  try {
    if (userData) {
      const response = await fetch(login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return response;
    } else return false
  } catch (err) {
    toast.error(err?.message);
  }
};
