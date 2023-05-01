import { Bot } from "grammy";
import help from "@/functions/help";
import start from "@/functions/start";
import blog from "@/functions/blog";
import playing from "@/functions/playing";
import playlist from "@/functions/playlist";
import error from "@/functions/error";

const functions = async (bot: Bot) => {
  await bot.use(help);
  await bot.use(start);
  await bot.use(blog);
  await bot.use(playing);
  await bot.use(playlist);
  await bot.use(error);
};

export default functions;
