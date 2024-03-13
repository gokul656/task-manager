import { UserRepository } from "../../interfaces/repository/user_repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Token } from "../../entities/token";
import { CustomError } from "../../../infrastructure/middlewares/errorHandler";

export class SignInUsecase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(cred: { email: string; password: string }): Promise<Token> {
        const user = await this.userRepo.getUserByEmail(cred.email);
        if (!user) {
            throw new CustomError("Invalid email or password", 400);
        }

        const passwordMatch = await bcrypt.compare(
            cred.password,
            user.password
        );
        if (!passwordMatch) {
            throw new CustomError("Invalid email or password", 400);
        }

        const token = jwt.sign({ userId: user.uid }, "hot-sand-dogs", {
            expiresIn: "24h",
        });

        return { uid: user.uid, token };
    }
}
