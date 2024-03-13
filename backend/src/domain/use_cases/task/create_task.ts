import { Task } from "../../entities/task";
import { TaskRepository } from "../../interfaces/repository/task_repository";

export class CreateTaskUsecase {
    constructor(private readonly taskRepo: TaskRepository) { }

    async execute(task: Task): Promise<Task> {
        return this.taskRepo.createTask(task);
    }
}