import { Bot, webhookCallback } from "grammy";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = process.env.TOKEN || "";

  if (token) throw new Error("No Telegram bot token!");

  const bot = new Bot(token);

  await webhookCallback(bot, "http");
}
