import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../infrastructure/database/db";
import UserModel from "./user.model";

export const TaskModel = sequelize.define("tasks", {
    taskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: UserModel,
            key: 'uid'
        }
    }
});