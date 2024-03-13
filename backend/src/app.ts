import express from 'express';
import "express-async-errors"; 
import Config, { env } from './config';
import { initialize } from './infrastructure/database/sequlize';
import { CreateTaskUsecase } from './domain/use_cases/task/create_task';
import AuthRouter from './presentation/controllers/auth_controller';
import { SignInUsecase } from './domain/use_cases/auth/sign_in';
import { SignUpUsecase } from './domain/use_cases/auth/sign_up';
import TaskRouter from './presentation/controllers/task_controller';
import { GetAllTasksUsecase } from './domain/use_cases/task/get_all_task';
import { GetTaskUsecase } from './domain/use_cases/task/get_task';
import BodyParser from 'body-parser';
import { TaskRepo } from './data/repositories/task_repository';
import { UserRepo } from './data/repositories/user_repository';
import { errorHandler } from './infrastructure/middlewares/errorHandler';
import verifyToken from './infrastructure/middlewares/authmiddleware';
import { EditTaskUsecase } from './domain/use_cases/task/edit_task';
import { DeleteTaskUsecase } from './domain/use_cases/task/delete_task';
import { swaggerSpec, swaggerUi } from './swagger_config';
import cors from 'cors';

const app = express();
const port = env[Config.API_PORT];

(async () => {
    try {
        await initialize();
        console.log("Database connection tested successfully.");
    } catch (error) {
        console.error("Error testing database connection:", error);
        return;
    }
})();

const userRepo = new UserRepo()
const taskRepo = new TaskRepo()

const authMiddleware = AuthRouter(
    new SignInUsecase(userRepo),
    new SignUpUsecase(userRepo)
)

const taskMiddleware = TaskRouter(
    new CreateTaskUsecase(taskRepo),
    new GetTaskUsecase(taskRepo),
    new GetAllTasksUsecase(taskRepo),
    new EditTaskUsecase(taskRepo),
    new DeleteTaskUsecase(taskRepo)
)

app.use(cors({origin: "*"}))
app.use(BodyParser.json())

// controllers
app.use("/auth", authMiddleware)
app.use("/task", verifyToken, taskMiddleware)

app.use(errorHandler)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
