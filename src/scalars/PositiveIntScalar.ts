import { GraphQLScalarType, Kind } from 'graphql';
import { CustomError } from '../exceptions';

const validatePositiveInt = (value: unknown) => {
  if (typeof value !== 'number') {
    throw CustomError.BadUserInput('Value should be a number'); 
  }

  if (value <= 0) {
    throw CustomError.BadUserInput('Value should be a positive integer greater than 0');
  }

  return value;
}

export const positiveIntScalar = new GraphQLScalarType({
  name: 'PositiveInt',
  description: 'A custom scalar for positive integers',
  serialize: validatePositiveInt,
  parseValue: validatePositiveInt,
  parseLiteral(ast) {
    if (ast.kind !== Kind.INT || parseInt(ast.value) <= 0) {
      throw CustomError.BadUserInput('Value should be a positive integer greater than 0');
    } 

    return parseInt(ast.value);
  },
});