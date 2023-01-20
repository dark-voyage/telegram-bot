import { Bot } from "grammy";
import help from "@/functions/help";
import start from "@/functions/start";
import minecraft from "@/functions/minecraft";
import gitlab from "@/functions/gitlab";

const functions = async (bot: Bot) => {
  await bot.use(help);
  await bot.use(start);
  await bot.use(gitlab);
  await bot.use(minecraft);
};

export default functions;
