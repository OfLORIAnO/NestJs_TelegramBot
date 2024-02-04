import { Context as ContextTelegraf } from 'telegraf';

export interface Context extends ContextTelegraf {
  session: {
    type?: TodoActionsTypeEnum;
  };
}

export interface ITodo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export enum TodoActionsTextEnum {
  getTodos = '📜 Список задач',
  done = '✅ Завершить',
  edit = '✏ Редактирование',
  delete = '❌ Удаление',
}

export enum TodoActionsTypeEnum {
  getTodos = 'list',
  done = 'done',
  edit = 'edit',
  delete = 'remove',
}
