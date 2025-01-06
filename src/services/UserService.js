import { toast } from "react-toastify";
import { profile, update } from "../Routes/userRoutes";

export const getUserDetails = async (empId) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await fetch(`${profile}/${empId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
    });

    if (response.ok) return response.json();
    else if (!response.ok) return false;
    else throw new Error("Failed to load profile");

  } catch (err) {
    console.error(err?.message || "An error occurred");
  }
};

export const updateUserDetails = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    const response = await fetch(update, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { "X-User-ID": userId }),
      },
      body: JSON.stringify(formData),
    });

    // if (!response.ok) {
    //   throw new Error("Failed to update team member details");
    // }

    return response.json();
  } catch (err) {
    toast.error(err?.message || "An error occurred");
  }
};
