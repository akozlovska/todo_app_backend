import { GraphQLScalarType, Kind } from 'graphql';
import { CustomError } from '../exceptions';

const validateISOFormatDate = (value: unknown) => {
  if (typeof value !== 'string') {
    throw CustomError.BadUserInput('Date must be a string'); 
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    throw CustomError.BadUserInput('Date must be a valid ISO 8601 string');
  }

  return date.toISOString();
}

export const dateISOScalar = new GraphQLScalarType({
  name: 'DateISO',
  description: 'A date string in ISO 8601 format',
  serialize: validateISOFormatDate,
  parseValue: validateISOFormatDate,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw CustomError.BadUserInput('Date must be a string');
    } 

    const date = new Date(ast.value);

    if (isNaN(date.getTime())) {
      throw CustomError.BadUserInput('Date must be a valid ISO 8601 string'); 
    }

    return date.toISOString();
  },
});