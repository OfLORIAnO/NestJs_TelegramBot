import { Markup } from 'telegraf';
import { TodoActionsTextEnum, TodoActionsTypeEnum } from './types';

export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback(
        TodoActionsTextEnum.getTodos,
        TodoActionsTypeEnum.getTodos,
      ),
      Markup.button.callback(
        TodoActionsTextEnum.done,
        TodoActionsTypeEnum.done,
      ),
      Markup.button.callback(
        TodoActionsTextEnum.edit,
        TodoActionsTypeEnum.edit,
      ),
      Markup.button.callback(
        TodoActionsTextEnum.delete,
        TodoActionsTypeEnum.delete,
      ),
    ],
    {
      columns: 2,
    },
  );
}
