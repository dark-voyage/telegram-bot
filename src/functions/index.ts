import { Bot } from "grammy";
import help from "@/functions/help";
import start from "@/functions/start";

const functions = async (bot: Bot) => {
  await bot.use(help);
  await bot.use(start);
};

export default functions;
