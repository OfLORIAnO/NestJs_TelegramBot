import { AppService } from './app.service';
import { Telegraf } from 'telegraf';
import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { actionButtons } from './app.buttons';
import { replyAllTodo } from './utils/handleReply';
import { Context, TodoActionsTextEnum, TodoActionsTypeEnum } from './types';
import { todoList } from './mock';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  async notFound(ctx: Context) {
    // await ctx.deleteMessage();
    await ctx.reply('Задачи с таким ID не существует');
  }

  findTask(id: number) {
    return todoList.find((todo) => todo.id === id);
  }

  @Start()
  async startCommand(context: Context) {
    await context.reply('Привет');
    await context.reply('Что ты хочешь?', actionButtons());
  }

  @Hears(TodoActionsTextEnum.getTodos)
  async getTodoList(ctx: Context) {
    await ctx.reply(replyAllTodo(todoList));
  }

  @Hears(TodoActionsTextEnum.done)
  async doneTask(ctx: Context) {
    ctx.session.type = TodoActionsTypeEnum.done;
    await ctx.reply('Напиши ID задачи');
  }

  @Hears(TodoActionsTextEnum.delete)
  async deleteTask(ctx: Context) {
    ctx.session.type = TodoActionsTypeEnum.delete;
    await ctx.reply('Напиши ID задачи');
  }

  @Hears(TodoActionsTextEnum.edit)
  async editTask(ctx: Context) {
    ctx.session.type = TodoActionsTypeEnum.edit;
    await ctx.replyWithHTML(`Напиши ID  новое название задачи в формате:
В формате - <b>1 | Новое название</b>`);
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) {
      ctx.reply('Я тебя не понимаю :(');
      return;
    }

    if (ctx.session.type === TodoActionsTypeEnum.edit) {
      // ? Edit Task
      const [taskId, newText] = message.split('|').map((t) => t.trim());
      todoList.forEach((t) => {
        t.id === +taskId && (t.text = newText);
      });
      await ctx.reply(replyAllTodo(todoList));
      ctx.session.type = null;
      return;
    }

    const todo = this.findTask(+message);
    if (!todo) {
      this.notFound(ctx);
    } else if (ctx.session.type === TodoActionsTypeEnum.done) {
      // ? Done Task
      todo.isCompleted = true;
    } else if (ctx.session.type === TodoActionsTypeEnum.delete) {
      // ? Delete Task
      todoList.filter((todo) => todo.id !== Number(message));
    }
    await ctx.reply(replyAllTodo(todoList));
    ctx.session.type = null;
  }
}
