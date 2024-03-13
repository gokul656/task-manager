import { Task } from "../../entities/task";
import { TaskRepository } from "../../interfaces/repository/task_repository";

export class GetAllTasksUsecase {
    constructor(private readonly taskRepo: TaskRepository) { }

    execute(uid: string): Promise<Task[]> {
        return this.taskRepo.getAllTasks(uid)
    }
}