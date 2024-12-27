import { GraphQLError } from 'graphql';

// class, which provides a centralized and readable way to throw errors  

export class CustomError extends GraphQLError {
  constructor(message: string, code: string) {
    super(message, { extensions: { code } });
  }

  static NotFound(message: string) {
    return new CustomError(message, 'NOT_FOUND');
  }

  static BadUserInput(message: string) {
    return new CustomError(message, 'BAD_USER_INPUT');
  }
}