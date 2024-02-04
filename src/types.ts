export interface ITodo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export enum TodoActionsEnum {
  getTodos = '📜 Список дел',
  done = '✅ Завершить',
  edit = '✏ Редактирование',
  delete = '❌ Удаление',
}
