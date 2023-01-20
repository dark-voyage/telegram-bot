import { Bot } from "grammy";
import help from "@/functions/help";
import start from "@/functions/start";
import minecraft from "@/functions/minecraft";

const functions = async (bot: Bot) => {
  await bot.use(start);
  await bot.use(help);
  await bot.use(minecraft);
};

export default functions;