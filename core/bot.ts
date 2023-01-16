import { Bot, webhookCallback } from "grammy"
import * as process from "process";

export const bot = new Bot(process.env.TOKEN || "");
export const handle = webhookCallback(bot, "next-js");