import { getFilteredTasks, getPaginatedTasks } from '../utils/helpers';
import { QueryResolvers } from "../types/generated";
import { CustomError } from "../exceptions";
import { TaskContext } from '../types/TaskContext';

export const queryResolvers: QueryResolvers<TaskContext> = {
  tasks(_, args, { dataSources }) {
    if (args.input) {
      let filteredTasks = dataSources.tasks;
      const filters = args.input.query;

      if (filters) {
        if (!('completed' in filters) && !filters.from && !filters.to) {
          throw CustomError.BadUserInput('You should provide at least 1 filter parameter in query field');
        }
        
        filteredTasks = getFilteredTasks(dataSources.tasks, filters);
      }

      if (args.input.pagination) {
        return getPaginatedTasks(filteredTasks, args.input.pagination);
      }

      return { taskList: filteredTasks };
    }

    return { taskList: dataSources.tasks };
  },
  task(_, { id }, { dataSources }) {
    const taskFound = dataSources.tasks.find(task => task.id === id);

    if (!taskFound) {
      throw CustomError.NotFound('Task with such id not found');
    }

    return taskFound;
  }
}