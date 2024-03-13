import { UserRepo } from "../../../src/data/repositories/user_repository";
import { SignInUsecase } from "../../../src/domain/use_cases/auth/sign_in";
import { SignUpUsecase } from "../../../src/domain/use_cases/auth/sign_up";
import bcrypt from "bcrypt";

describe("SignInUsecase", () => {
    let userRepositoryMock: jest.Mocked<UserRepo>;
    let signInUsecase: SignInUsecase;

    beforeEach(() => {
        userRepositoryMock = {
            getUserByEmail: jest.fn(),
        } as unknown as jest.Mocked<UserRepo>;

        signInUsecase = new SignInUsecase(userRepositoryMock);
    });

    test("should sign in user with correct credentials", async () => {
        const useDetails = {
            uid: "1",
            email: "mock@mailsac.com",
            password: "password",
        };
        const cred = { email: "test@example.com", password: "password" };
        jest.spyOn(userRepositoryMock, "getUserByEmail").mockResolvedValue(
            Promise.resolve(useDetails)
        );
        const compareMock = jest.spyOn(bcrypt, "compare");
        compareMock.mockImplementation((password, dbpassword) =>
            Promise.resolve(password === dbpassword)
        );

        const result = await signInUsecase.execute(cred);
        expect(result.uid).toEqual("1");
        expect(result.token).toBeDefined();
    });

    test("should throw error for invalid email", async () => {
        const cred = { email: "invalid@example.com", password: "password" };
        await expect(signInUsecase.execute(cred)).rejects.toThrow(
            "Invalid email or password"
        );
    });
});

describe("SignUpUsecase", () => {
    let userRepositoryMock: jest.Mocked<UserRepo>;
    let signupUsecase: SignUpUsecase;

    beforeEach(() => {
        userRepositoryMock = {
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
        } as unknown as jest.Mocked<UserRepo>;

        signupUsecase = new SignUpUsecase(userRepositoryMock);
    });

    test("should sign up user with correct credentials", async () => {
        const userData = {
            uid: "1",
            email: "mock@mailsac.com",
            password: "password",
        };

        const cred = { email: "test@example.com", password: "password" };

        jest.spyOn(userRepositoryMock, "getUserByEmail").mockResolvedValue(
            Promise.resolve(null)
        );
        jest.spyOn(userRepositoryMock, "createUser").mockResolvedValue(
            Promise.resolve(userData)
        );

        const result = await signupUsecase.execute(cred);
        expect(result.uid).toEqual("1");
        expect(result.token).toBeDefined();
    });

    test("should throw error for user already exists", async () => {
        jest.spyOn(userRepositoryMock, "getUserByEmail").mockResolvedValue(
            Promise.resolve({
                uid: "1",
                email: "mock@mailsac.com",
                password: "password",
            })
        );
        const cred = { email: "test@example.com", password: "password" };
        await expect(signupUsecase.execute(cred)).rejects.toThrow(
            "Email already registered"
        );
    });
});
