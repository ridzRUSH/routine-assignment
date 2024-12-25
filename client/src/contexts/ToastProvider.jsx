import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const Toast = ({ message, type }) => {
  return (
    <div
      className={`p-4 rounded shadow-lg text-white ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    >
      {message}
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-[45%] space-y-2 z-50">
          {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} type={toast.type} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
