import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import httpStatus from "http-status";
import { TErrorSources } from "../interface/error";
import handleZodError from "../error/handelZodError";
import handleValidationError from "../error/handleValidationError";
import handleDuplicateError from "../error/handleDuplicateError";
import AppError from "../error/AppError";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode || httpStatus.BAD_REQUEST;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode || httpStatus.UNPROCESSABLE_ENTITY;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode || httpStatus.CONFLICT;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
        statusCode = err.statusCode || httpStatus.BAD_REQUEST;
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config.NodeDev === 'development' ? err?.stack : null,
    });


}
export default globalErrorHandler;