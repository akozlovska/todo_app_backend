import { GraphQLScalarType, Kind } from 'graphql';
import { CustomError } from '../exceptions';

const validate500LengthString = (value: unknown) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw CustomError.BadUserInput('Description must be a non-empty string'); 
  }

  if (value.length > 500) {
    throw CustomError.BadUserInput('Description exceeds the maximum length of 500 characters');
  }

  return value;
}

export const maxLengthDescriptionScalar = new GraphQLScalarType({
  name: 'MaxLengthDescription',
  description: 'A string of max length of 500 characters',
  serialize: validate500LengthString,
  parseValue: validate500LengthString,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING || !ast.value.trim()) {
      throw CustomError.BadUserInput('Description must be a non-empty string');
    } 

    if (ast.value.length > 500) {
      throw CustomError.BadUserInput('Description exceeds the maximum length of 500 characters');
    }

    return ast.value;
  },
});