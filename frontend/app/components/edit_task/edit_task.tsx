import { InputLabel } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/app/types/response";
import { updateTask, addTask } from "@/app/services/api.services";
import AlertComponent from "@/app/components/alert/alert";

interface EditTaskCompProps {
  open: boolean;
  setOpen: any;
  task: Task;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const EditTaskComponent: React.FC<EditTaskCompProps> = ({
  open,
  setOpen,
  task,
  setState,
}) => {
  const handleClose = () => setOpen(false);
  const [alert, setAlert] = useState<{
    severity: "error" | "success";
    message: string;
  } | null>(null);

  const handleAlertClose = () => {
    setAlert(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    if (task.taskId !== "" && task.taskId !== undefined) {
      updateTask({
        taskId: task.taskId,
        title: formJson.title,
        description: formJson.description,
      })
        .then((data) => {
          setState(data.data);
          handleClose();
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage =
              error.response?.data.error ||
              "An error occurred during registration.";
            setAlert({ severity: "error", message: errorMessage });
          } else {
            setAlert({
              severity: "error",
              message: "An error occurred during registration.",
            });
          }
        });
    } else {
      addTask({
        taskId: task.taskId,
        title: formJson.title,
        description: formJson.description,
      })
        .then((data: any) => {
          setState(data);
          handleClose();
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage =
              error.response?.data.error ||
              "An error occurred during registration.";
            setAlert({ severity: "error", message: errorMessage });
          } else {
            setAlert({
              severity: "error",
              message: "An error occurred during registration.",
            });
          }
        });
    }
  };

  return (
    <div>
      <React.Fragment>
        {alert && (
          <AlertComponent
            severity={alert.severity}
            message={alert.message}
            onClose={handleAlertClose}
          />
        )}
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle>
            {task.title === undefined ? "Add Task" : "Update Task"}
          </DialogTitle>
          <DialogContent>
            <div>
              <InputLabel htmlFor="task">Title</InputLabel>
              <TextField
                fullWidth
                autoFocus
                required
                inputProps={{ style: { textTransform: "capitalize" } }}
                name="title"
                defaultValue={task !== null ? task.title : ""}
              />
              <InputLabel htmlFor="description">Description</InputLabel>
              <TextField
                multiline
                rows={8}
                fullWidth
                required
                name="description"
                defaultValue={task !== null ? task.description : ""}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default EditTaskComponent;
