const { toast } = require("react-toastify");
const { register } = require("../Routes/userRoutes");

exports.register = async (userData) => {
  try {
    if (userData) {
      const response = await fetch(register, {
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
