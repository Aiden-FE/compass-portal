import { CreateTodoDto, TodoListQuery, ModifyTodoDto } from '@/interfaces';
import { createRequest } from './core';

export function getTodoList(query?: TodoListQuery) {
  return createRequest({
    url: '/v1/todo',
    method: 'GET',
    data: query,
  });
}

export function createTodo(todo: CreateTodoDto) {
  return createRequest({
    url: '/v1/todo',
    method: 'POST',
    data: todo,
  });
}

export function modifyTodo(todo: ModifyTodoDto) {
  return createRequest({
    url: '/v1/todo',
    method: 'PUT',
    data: todo,
  });
}

export function deleteTodo(id: number) {
  return createRequest({
    url: '/v1/todo',
    method: 'DELETE',
    data: { id },
  });
}
