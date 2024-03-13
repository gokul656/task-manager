import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../domain/entities/task';
import { TaskRepository } from '../../domain/interfaces/repository/task_repository';
import { TaskModel } from '../models/task.model';

export class TaskRepo implements TaskRepository {
    async createTask(task: Task): Promise<Task> {
        const savedTask = await TaskModel.create(task)
        return savedTask.get({});
    }

    async editTask(task: Task): Promise<Task> {
        await TaskModel.update({
            ...task
        }, {
            where: { taskId: task.taskId, userId: task.userId }
        })
        return task;
    }

    async deleteTask(taskId: string, userId: string): Promise<null> {
        await TaskModel.destroy({
            where: {
                taskId,
                userId
            }
        })
        return null;
    }

    async getTask(taskId: string, userId: string): Promise<Task> {
        const task = await TaskModel.findOne({
            where: { taskId, userId }
        })
        return task && task.get();
    }

    async getAllTasks(uid: string): Promise<any[]> {
        const taskList = await TaskModel.findAll({
            where: { userId: uid }
        });
        return taskList;
    }
}