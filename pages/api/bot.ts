import {Bot, Context, webhookCallback} from "grammy";
import type { NextApiRequest, NextApiResponse } from "next";
import {handle} from "@/core/bot";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Token from ENV
  const token = process.env.TOKEN || "";

  if (token) throw new Error("No Telegram bot token!");

  const bot = new Bot(token);

  bot.on("message", (ctx) => ctx.reply("Got another message!"));

  return await handle(req, res);
}
