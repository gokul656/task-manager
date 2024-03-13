import { TaskRepo } from "../../../src/data/repositories/task_repository";
import { CreateTaskUsecase } from "../../../src/domain/use_cases/task/create_task";
import { DeleteTaskUsecase } from "../../../src/domain/use_cases/task/delete_task";
import { EditTaskUsecase } from "../../../src/domain/use_cases/task/edit_task";
import { GetAllTasksUsecase } from "../../../src/domain/use_cases/task/get_all_task";
import { GetTaskUsecase } from "../../../src/domain/use_cases/task/get_task";

describe("CreateTaskUsecase", () => {
    let taskRepositoryMock: jest.Mocked<TaskRepo>;
    let createTaskUsecase: CreateTaskUsecase;

    beforeEach(() => {
        taskRepositoryMock = {
            createTask: jest.fn(),
        } as unknown as jest.Mocked<TaskRepo>;

        createTaskUsecase = new CreateTaskUsecase(taskRepositoryMock);
    });

    test("should create task", async () => {
        const taskData = {
            taskId: "taskId",
            title: "title",
            description: "description",
            userId: "userId",
        };
        jest.spyOn(taskRepositoryMock, "createTask").mockResolvedValue(
            taskData
        );
        const result = await createTaskUsecase.execute(taskData);
        expect(result).toEqual(taskData);
    });
});

describe("GetTaskUsecase", () => {
    let taskRepositoryMock: jest.Mocked<TaskRepo>;
    let getTaskUsecase: GetTaskUsecase;

    beforeEach(() => {
        taskRepositoryMock = {
            getTask: jest.fn(),
        } as unknown as jest.Mocked<TaskRepo>;

        getTaskUsecase = new GetTaskUsecase(taskRepositoryMock);
    });

    test("should get task", async () => {
        const taskData = {
            taskId: "taskId",
            title: "title",
            description: "description",
            userId: "userId",
        };
        jest.spyOn(taskRepositoryMock, "getTask").mockResolvedValue(taskData);
        const result = await getTaskUsecase.execute(
            taskData.description,
            taskData.userId
        );
        expect(result).toEqual(taskData);
    });
});

describe("GetAllTasksUsecase", () => {
    let taskRepositoryMock: jest.Mocked<TaskRepo>;
    let getAllTaskUsecase: GetAllTasksUsecase;

    beforeEach(() => {
        taskRepositoryMock = {
            getAllTasks: jest.fn(),
        } as unknown as jest.Mocked<TaskRepo>;

        getAllTaskUsecase = new GetAllTasksUsecase(taskRepositoryMock);
    });

    test("should get all task", async () => {
        const taskData = {
            taskId: "taskId",
            title: "title",
            description: "description",
            userId: "userId",
        };
        jest.spyOn(taskRepositoryMock, "getAllTasks").mockResolvedValue([
            taskData,
        ]);
        const result = await getAllTaskUsecase.execute(taskData.userId);
        expect(result).toEqual([taskData]);
    });
});

describe("EditTaskUsecase", () => {
    let taskRepositoryMock: jest.Mocked<TaskRepo>;
    let editTaskUsecase: EditTaskUsecase;

    beforeEach(() => {
        taskRepositoryMock = {
            editTask: jest.fn(),
        } as unknown as jest.Mocked<TaskRepo>;

        editTaskUsecase = new EditTaskUsecase(taskRepositoryMock);
    });

    test("should edit task", async () => {
        const taskData = {
            taskId: "taskId",
            title: "title",
            description: "description",
            userId: "userId",
        };
        jest.spyOn(taskRepositoryMock, "editTask").mockResolvedValue(taskData);
        const result = await editTaskUsecase.execute(taskData);
        expect(result).toEqual(taskData);
    });
});

describe("DeleteTaskUsecase", () => {
    let taskRepositoryMock: jest.Mocked<TaskRepo>;
    let deleteTaskUsecase: DeleteTaskUsecase;

    beforeEach(() => {
        taskRepositoryMock = {
            deleteTask: jest.fn(),
        } as unknown as jest.Mocked<TaskRepo>;

        deleteTaskUsecase = new DeleteTaskUsecase(taskRepositoryMock);
    });

    test("should Delete task", async () => {
        const taskData = {
            taskId: "taskId",
            title: "title",
            description: "description",
            userId: "userId",
        };
        jest.spyOn(taskRepositoryMock, "deleteTask").mockImplementation(
            () => null
        );
        const result = await deleteTaskUsecase.execute(
            taskData.taskId,
            taskData.userId
        );
        expect(result).toEqual(null);
    });
});
