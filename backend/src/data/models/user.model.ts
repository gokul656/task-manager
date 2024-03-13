import { DataTypes } from "sequelize";
import { sequelize } from "../../infrastructure/database/db";

const UserModel = sequelize.define("users", {
    // id: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     autoIncrement: true,
    // },
    uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    }
});

export default UserModel;
