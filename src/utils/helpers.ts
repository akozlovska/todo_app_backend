import { CustomError } from "../exceptions";
import { Task, TasksFilters, TasksPagination } from "../types/generated";

export const getPaginatedTasks = (tasks: Task[], params: TasksPagination) => {
  const { page, limit } = params;
  const total = tasks.length;
  const totalPages = Math.ceil(total / limit);

  if (page > totalPages) {
    throw CustomError.BadUserInput(`Maximum pages count for this query is ${totalPages}`);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTasks = tasks.slice(startIndex, endIndex);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const metadata = {
    page,
    limit,
    hasNextPage,
    hasPreviousPage,
    total,
  };

  return {
    taskList: paginatedTasks,
    metadata,
  };
};

export const getFilteredTasks = (tasks: Task[], filters: TasksFilters) => {
  return tasks.filter(task => {
    let isTaskValid = true;
    if ('completed' in filters) {
      if (task.completed !== filters.completed) {
        isTaskValid = false;
      }
    }

    if (filters.from) {
      const taskDate = new Date(task.dueDate);
      const startDate = new Date(filters.from);
      if (taskDate.getTime() < startDate.getTime()) {
        isTaskValid = false;
      }
    }

    if (filters.to) {
      const taskDate = new Date(task.dueDate);
      const endDate = new Date(filters.to);
      if (taskDate.getTime() > endDate.getTime()) {
        isTaskValid = false;
      }
    }

    return isTaskValid;
  })
}