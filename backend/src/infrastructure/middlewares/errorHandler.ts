// Error handler middleware
export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    console.error(err);

    res.status(statusCode).json({ statusCode, error: message });
};

export class CustomError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
