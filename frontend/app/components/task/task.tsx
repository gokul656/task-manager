import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    Button,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { deleteTask } from "@/app/services/api.services";
import EditTaskComponent from "../edit_task/edit_task";

import "@/app/components/task/styles.css";
import { ApiErrorResponse } from "@/app/types/response";
import { AxiosError } from "axios";
import router from "next/router";
import AlertComponent from "../alert/alert";

const TaskComponent = ({ data, setState }: { data: Task[], setState: any }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<string>("");
    const [task, setTask] = useState<Task>({} as Task);
    const [alert, setAlert] = useState<{ severity: "error" | "success", message: string } | null>(null);

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen("");
    };

    const handleDelete = (taskId: string) => {
        deleteTask(taskId)
            .then(() => {
                setAlert({ severity: "success", message: "Deleted successful!" });
                handleCloseDeleteDialog()
                setState(taskId)
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    const err = error as AxiosError<ApiErrorResponse>
                    const errorMessage = error.response?.data.error || "An error occurred during registration.";
                    setAlert({ severity: "error", message: errorMessage })
                } else {
                    setAlert({ severity: "error", message: "An error occurred during registration." });
                    handleCloseDeleteDialog()

                }
            });;

        setOpen(false);
    };

    const handleAlertClose = () => {
        setAlert(null);
    };

    return (
        <div className="task-layout">
            {alert && (
                <AlertComponent
                    severity={alert.severity}
                    message={alert.message}
                    onClose={handleAlertClose}
                />
            )}

            {data.map((task) => (
                <Card
                    key={task.taskId}
                    variant="outlined"
                    sx={{ maxWidth: 345 }}
                    className="task-widget"
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {task.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="description">
                            {task.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={() => {
                                setOpen(true);
                                setTask(task);
                            }}
                            size="small"
                        >
                            Update
                        </Button>
                        <Button
                            onClick={() => setDeleteDialogOpen(task.taskId)}
                            size="small"
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            ))}

            <EditTaskComponent
                setState={setState}
                open={open}
                setOpen={setOpen}
                task={task}
            ></EditTaskComponent>

            <Dialog
                open={deleteDialogOpen !== ""}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete this task?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={() => handleDelete(deleteDialogOpen)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <div
                className="fab"
                onClick={() => {
                    setOpen(true);
                    setTask({} as Task);
                }}
            >
                <i className="fas fa-plus">+</i>
            </div>
        </div>
    );
};

export default TaskComponent;
