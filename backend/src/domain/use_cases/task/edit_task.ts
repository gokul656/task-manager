import { Task } from "../../entities/task";
import { TaskRepository } from "../../interfaces/repository/task_repository";

export class EditTaskUsecase {
    constructor(private readonly taskRepo: TaskRepository) { }

    execute(task: Task): Promise<Task> {
        return this.taskRepo.editTask(task);
    }
}