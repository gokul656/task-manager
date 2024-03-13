import express from "express";
import { Router } from "express/lib/router";
import { CreateTaskUsecase } from "../../domain/use_cases/task/create_task";
import { GetTaskUsecase } from "../../domain/use_cases/task/get_task";
import { GetAllTasksUsecase } from "../../domain/use_cases/task/get_all_task";
import { EditTaskUsecase } from "../../domain/use_cases/task/edit_task";
import { DeleteTaskUsecase } from "../../domain/use_cases/task/delete_task";
import { Task } from "../../domain/entities/task";
import { validate } from "../../infrastructure/middlewares/validators/common.validator";
import {
    taskValidation,
    taskIdValidation,
    editTaskValidation,
} from "../../infrastructure/middlewares/validators/task.validator";
import { CustomError } from "../../infrastructure/middlewares/errorHandler";

export default function TaskRouter(
    createTaskUsecase: CreateTaskUsecase,
    getTaskUsecase: GetTaskUsecase,
    getAllTasksUsecase: GetAllTasksUsecase,
    editTaskUsecase: EditTaskUsecase,
    deleteTaskUsecase: DeleteTaskUsecase
): Router {
    const router = express.Router();
    const createTask = async (req, res, _next) => {
        const task: Task = req.body;
        task.userId = req.userId;
        const createdTask = await createTaskUsecase.execute(task);
        return res.send({
            status: "success",
            method: "create-task",
            data: createdTask,
        });
    };

    const getTask = async (req, res, _next) => {
        const taskId: string = req.params["id"];
        const task = await getTaskUsecase.execute(taskId, req.userId);
        if (!task) {
            throw new CustomError("Task not found", 404);
        }
        return res.send({
            status: "success",
            method: "get-task",
            data: task,
        });
    };

    const getAllTasks = async (req, res, _next) => {
        const allTasks = await getAllTasksUsecase.execute(req.userId);

        return res.send({
            status: "success",
            method: "get-all-task",
            data: allTasks,
        });
    };

    const editTask = async (req, res, _next) => {
        const task: Task = req.body;
        task.userId = req.userId;
        const taskDetails = await getTaskUsecase.execute(
            task.taskId,
            req.userId
        );
        if (!taskDetails) {
            throw new CustomError("Invalid task id", 400);
        }
        const updatedTask = await editTaskUsecase.execute(task);
        return res.send({
            status: "success",
            method: "edit-task",
            data: updatedTask,
        });
    };

    const deleteTask = async (req, res, _next) => {
        const taskId: string = req.params["id"];
        const taskDetails = await getTaskUsecase.execute(taskId, req.userId);
        if (!taskDetails) {
            throw new CustomError("Task not found", 400);
        }
        await deleteTaskUsecase.execute(taskId, req.userId);
        return res.send({
            status: "success",
            method: "delete-task",
            data: {},
        });
    };

    router.post("/", taskValidation(), validate, createTask);
    router.put("/", editTaskValidation(), validate, editTask);
    router.delete("/:id", taskIdValidation(), validate, deleteTask);
    router.get("/:id", taskIdValidation(), validate, getTask);
    router.get("/", getAllTasks);

    return router;
}
