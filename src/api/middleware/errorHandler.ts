import { Request, Response, NextFunction } from "express";

interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const { statusCode = 500, message } = error;

  // Log error for debugging
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.path}:`,
    error
  );

  // Send error response
  res.status(statusCode).json({
    error: {
      message: statusCode === 500 ? "Internal Server Error" : message,
      status: statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
    },
  });
};

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
