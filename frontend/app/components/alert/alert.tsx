import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import "@/app/components/alert/styles.css";

interface AlertMessageProps {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  onClose: () => void;
}

const AlertComponent: React.FC<AlertMessageProps> = ({
  severity,
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="alert-container">
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </div>
  );
};

export default AlertComponent;
