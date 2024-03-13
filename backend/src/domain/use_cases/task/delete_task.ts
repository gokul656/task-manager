import { TaskRepository } from "../../interfaces/repository/task_repository";

export class DeleteTaskUsecase {
    constructor(private readonly taskRepo: TaskRepository) { }

    execute(taskId: string, userId: string): Promise<null> {
        return this.taskRepo.deleteTask(taskId, userId);
    }
}