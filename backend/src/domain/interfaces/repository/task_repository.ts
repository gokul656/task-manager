import { Task } from '../../entities/task';

export interface TaskRepository {
    createTask(task: Task): Promise<Task>
    getTask(taskId: string, userId: string): Promise<Task>
    getAllTasks(uid: string): Promise<Task[]>
    editTask(task: Task): Promise<Task>
    deleteTask(taskId: string, userId: string): Promise<null>
}