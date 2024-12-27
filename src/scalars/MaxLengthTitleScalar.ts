import { GraphQLScalarType, Kind } from 'graphql';
import { CustomError } from '../exceptions';

const validate100LengthString = (value: unknown) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw CustomError.BadUserInput('Title must be a non-empty string'); 
  }

  if (value.length > 100) {
    throw CustomError.BadUserInput('Title exceeds the maximum length of 100 characters');
  }

  return value;
}

export const maxLengthTitleScalar = new GraphQLScalarType({
  name: 'MaxLengthTitle',
  description: 'A string of max length of 100 characters',
  serialize: validate100LengthString,
  parseValue: validate100LengthString,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING || !ast.value.trim()) {
      throw CustomError.BadUserInput('Title must be a non-empty string');
    } 

    if (ast.value.length > 100) {
      throw CustomError.BadUserInput('Title exceeds the maximum length of 100 characters');
    }

    return ast.value;
  },
});