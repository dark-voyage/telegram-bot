import { Bot, webhookCallback } from "grammy";

// Bot instance
const bot = new Bot(process.env.BOT_TOKEN);

// Commands
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Got another message!"));

// Webhook
export default webhookCallback(bot, "http");