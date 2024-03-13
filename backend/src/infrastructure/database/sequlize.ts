import { TaskModel } from "../../data/models/task.model";
import UserModel from "../../data/models/user.model";
import { sequelize } from "./db";

export async function initialize() {
    try {
        await sequelize.authenticate().then(async () => {
            console.log("Database authenticated successfully.");
            await UserModel.sync();
            await TaskModel.sync();
            console.log("Database schema synchronized successfully.");
        });
    } catch (error) {
        console.error("Unable to synchronize the database:", error);
        throw error;
    }
}
