import { 
  dateISOScalar, 
  maxLengthDescriptionScalar, 
  maxLengthTitleScalar, 
  positiveIntScalar
} from '../scalars';
import { mutationResolvers } from './mutationResolvers';
import { queryResolvers } from './queryResolvers';
import { Resolvers } from '../types/generated';
import { TaskContext } from '../types/TaskContext';

// scalars are a centralized and preferred approach for data validation
export const resolvers: Resolvers<TaskContext> = {
  DateISO: dateISOScalar,
  MaxLengthDescription: maxLengthDescriptionScalar,
  MaxLengthTitle: maxLengthTitleScalar,
  PositiveInt: positiveIntScalar,
  Query: queryResolvers,
  Mutation: mutationResolvers,
};