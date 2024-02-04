import { Markup } from 'telegraf';
import { TodoActionsEnum } from './types';

export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback(TodoActionsEnum.getTodos, 'list'),
      Markup.button.callback(TodoActionsEnum.done, 'done'),
      Markup.button.callback(TodoActionsEnum.edit, 'edit'),
      Markup.button.callback(TodoActionsEnum.delete, 'delete'),
    ],
    {
      columns: 2,
    },
  );
}
