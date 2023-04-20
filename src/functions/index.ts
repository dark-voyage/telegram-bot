import { Bot } from "grammy";
import help from "@/functions/help";
import start from "@/functions/start";
import blog from "@/functions/blog";

const functions = async (bot: Bot) => {
  await bot.use(help);
  await bot.use(start);
  await bot.use(blog);
};

export default functions;
