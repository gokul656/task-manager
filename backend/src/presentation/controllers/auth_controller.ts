import express, { Router } from 'express';
import { SignInUsecase } from '../../domain/use_cases/auth/sign_in';
import { SignUpUsecase } from '../../domain/use_cases/auth/sign_up';
import { User } from '../../domain/entities/user';
import { loginValidation, registerValidation } from '../../infrastructure/middlewares/validators/auth.validator';
import { validate } from '../../infrastructure/middlewares/validators/common.validator';

export default function AuthRouter(
    signInUsecase: SignInUsecase,
    signUpUsecase: SignUpUsecase
): Router {
    const router = express.Router();

    const signin = async (req, res, next) => {
        const body: User = req.body;
        const userData = await signInUsecase.execute(body)
        return res.send(
            {
                status: "success",
                method: "sign-in",
                data: userData
            }
        )
    }

    const signup = async (req, res, next) => {
        try {
            const body: User = req.body;
            const user = await signUpUsecase.execute(body)
            return res.send(
                {
                    status: "success",
                    method: "sign-up",
                    data: user
                }
            )
        } catch (err) {
            return next(err)
        }
    }

    router.post("/signup", registerValidation(), validate, signup)
    router.post("/signin", loginValidation(), validate, signin)

    return router
}
