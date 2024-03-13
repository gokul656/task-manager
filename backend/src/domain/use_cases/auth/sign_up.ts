import { CustomError } from "../../../infrastructure/middlewares/errorHandler";
import { Token } from "../../entities/token";
import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repository/user_repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class SignUpUsecase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(user: User): Promise<Token> {
        const existUser = await this.userRepo.getUserByEmail(user.email);
        if (existUser) {
            throw new CustomError("Email already registered", 409);
        }

        user.password = await bcrypt.hash(user.password, 10);
        const dbUser = await this.userRepo.createUser(user);
        const token = jwt.sign({ userId: dbUser.uid }, "hot-sand-dogs", {
            expiresIn: "24h",
        });

        return { uid: dbUser.uid, token };
    }
}
