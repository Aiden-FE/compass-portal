export interface Todo {
  title: string;
  isFinished: boolean;
  description?: string;
}

export type Todos = Todo[];
