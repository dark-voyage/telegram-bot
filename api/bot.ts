import { Bot, webhookCallback } from "grammy";
import * as process from "process";

const token: string = process.env.TOKEN || "";

// Bot instance
const bot = new Bot(token);

// Commands
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));

// Webhook
export default webhookCallback(bot, "http");