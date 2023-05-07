export interface Todo {
  id: number;
  title: string;
  isFinished: boolean;
  description?: string;
}

export type Todos = Todo[];
