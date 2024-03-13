import { Task } from "../../entities/task";
import { TaskRepository } from "../../interfaces/repository/task_repository";

export class GetTaskUsecase {
    constructor(private readonly taskRepo: TaskRepository) { }

    async execute(taskId: string, userId: string): Promise<Task> {
        const task = await this.taskRepo.getTask(taskId, userId);
        return task
    }
}