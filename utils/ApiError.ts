export interface IError {
     message: string;
     statusCode: number;
     isOperational?: boolean;
     stack?: string;
}

class ApiError extends Error {
     public statusCode: number;

     constructor(statusCode: number, message: string, isOperational = true, stack = '') {
          super();
          this.statusCode = statusCode;
          this.message = message;

          if (stack) this.stack = stack;
          else Error.captureStackTrace(this, this.constructor);
     }
}

export default ApiError;
