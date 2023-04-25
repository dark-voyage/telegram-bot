import { Bot } from "grammy";
import help from "@/functions/help";
import start from "@/functions/start";
import blog from "@/functions/blog";
import playing from "@/functions/playing";

const functions = async (bot: Bot) => {
  await bot.use(help);
  await bot.use(start);
  await bot.use(blog);
  await bot.use(playing);
};

export default functions;
