import React from "react";
import { toast, ToastOptions, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "theme/theme";

interface NotifyOptions extends ToastOptions {
  type: "success" | "error";
}

const customToastStyle = {
  fontSize: theme.fontSizes.normal,
  textAlign: "center",
  borderRadius: theme.radii.small,
  padding: "16px",
};

const notify = (message: string, options: NotifyOptions) => {
  const { type, ...toastOptions } = options;

  toast(
    React.createElement(
      "p",
      {
        style: {
          ...customToastStyle,
          fontSize: theme.fontSizes.normal,
          color: type === "success" ? theme.colors.green : theme.colors.invalid,
        },
      },
      message
    ),
    Object.assign(
      {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        type,
      },
      toastOptions
    )
  );
};
const notifySuccess = (
  message: string,
  options?: Omit<NotifyOptions, "type">
) => notify(message, { type: "success", ...options });

const notifyError = (message: string, options?: Omit<NotifyOptions, "type">) =>
  notify(message, { type: "error", ...options });

export { ToastContainer, notifySuccess, notifyError };
