export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }

  static BadRequest(message: string, details?: any) {
    return new AppError(400, message, details);
  }

  static Unauthorized(message: string, details?: any) {
    return new AppError(401, message, details);
  }

  static Forbidden(message: string, details?: any) {
    return new AppError(403, message, details);
  }

  static NotFound(message: string, details?: any) {
    return new AppError(404, message, details);
  }

  static Conflict(message: string, details?: any) {
    return new AppError(409, message, details);
  }

  static InternalServerError(message: string, details?: any) {
    return new AppError(500, message, details);
  }
}