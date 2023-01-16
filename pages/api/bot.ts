import {Bot, Context, webhookCallback} from "grammy";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Token from ENV
  const token = process.env.TOKEN || "";

  if (token) throw new Error("No Telegram bot token!");

  const bot = new Bot(token);

  bot.command('start', async (ctx: Context) => {
    await ctx.reply('Hi!')
  })

  bot.command('help', async (ctx: Context) => {
    await ctx.reply('Hello')
  })

  await webhookCallback(bot, "http");
}
