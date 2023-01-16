import { Bot } from "grammy";
import start from "@/functions/start.ts";
import help from "@/functions/help.ts";

export default async (bot: Bot) => {
    await bot.use(start);
    await bot.use(help);
};