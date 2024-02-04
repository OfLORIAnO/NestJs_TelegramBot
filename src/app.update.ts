import { AppService } from './app.service';
import { Context, Telegraf } from 'telegraf';
import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { actionButtons } from './app.buttons';
import { replyAllTodo } from './utils/handleReply';
import { TodoActionsEnum } from './types';
import { todoList } from './mock';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(context: Context) {
    await context.reply('Привет');
    await context.reply('Что ты хочешь?', actionButtons());
  }

  @Hears(TodoActionsEnum.getTodos)
  async getTodoList(ctx: Context) {
    await ctx.reply(replyAllTodo(todoList));
  }

  @Hears(TodoActionsEnum.done)
  async doneTask(ctx: Context) {
    await ctx.reply(replyAllTodo(todoList));
  }
}
