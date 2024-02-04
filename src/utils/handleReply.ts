import { ITodo } from 'src/types';

export const replyAllTodo = (todos: ITodo[]): string => `Список дел:
${todos.map((todo) => `${todo.isCompleted ? '✅' : '❌'} ${todo.text}`).join('\n')}`;
