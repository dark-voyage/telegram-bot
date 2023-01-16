import { Bot, webhookCallback } from "grammy";
import type { NextApiRequest, NextApiResponse } from 'next'

const token = process.env.TOKEN || ""
const bot = new Bot(token);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await webhookCallback(bot, "http");
}
