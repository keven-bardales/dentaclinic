export class ApiResponse<T> {
  constructor(public data: T | null, public message: string | null, public statusCode: number, public errors: string[], public success = true) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = success;
  }

  static success<T>({ data, message, statusCode }: { data: T; message: string; statusCode: number }) {
    return new ApiResponse<T>(data, message, statusCode, [], true);
  }

  static error<T>({ message, statusCode, errors }: { message: string | null; statusCode: number; errors: string[] }) {
    return new ApiResponse<T>(null as T, message, statusCode, errors, false);
  }

  static unauthorized<T>({ message, errors }: { message: string | null; errors: string[] }) {
    return new ApiResponse<T>(null as T, message, 401, errors, false);
  }

  static badRequest<T>({ message, errors }: { message: string | null; errors: string[] }) {
    return new ApiResponse<T>(null as T, message, 400, errors, false);
  }

  static notFound<T>({ message, errors }: { message: string | null; errors: string[] }) {
    return new ApiResponse<T>(null as T, message, 404, errors, false);
  }

  static internalServerError<T>({ message, errors }: { message: string | null; errors: string[] }) {
    return new ApiResponse<T>(null as T, message, 500, errors, false);
  }
}
