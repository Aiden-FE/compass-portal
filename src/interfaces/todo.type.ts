import { PaginationQuery } from './base.type';

export interface TodoListQuery extends PaginationQuery {
  keyword?: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  isFinished?: boolean;
}

export interface ModifyTodoDto {
  id: number;
  title: string;
  description?: string;
  isFinished?: boolean;
}
