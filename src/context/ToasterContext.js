import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showToast = (message, type = "info", duration = 2000) => {
    switch (type) {
      case "success":
        toast.success(message, { autoClose: duration });
        break;
      case "error":
        toast.error(message, { autoClose: duration });
        break;
      case "info":
        toast.info(message, { autoClose: duration });
        break;
      default:
        toast(message, { autoClose: duration });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.showToast;
};
