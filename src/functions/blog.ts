import { Composer, Context, InlineKeyboard } from "grammy";
import { Post } from "@/types/serverless";
import pager from "../utils/pager";

const composer = new Composer();

const ctxMenuText =
  `<b>Blog contents written by Yuri</b>` +
  `\n` +
  `\n` +
  `Please, choose one of the following options:`;

composer.command("blog", async (ctx: Context): Promise<void> => {
  const keyboard = new InlineKeyboard();
  const request: Response = await fetch("https://katsuki.moe/api/blog");
  const contents: Post[] = await request.json();

  for (const post of pager<Post>(contents, 1)) {
    keyboard.url(post.title, `https://katsuki.moe/blog/${post.slug}`).row();
  }

  if (pager(contents, 2).length > 0) {
    keyboard.text(`Next ➡️`, `blog_2`);
  }

  await ctx.reply(ctxMenuText, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

composer.callbackQuery(/^blog_(\d+)$/, async (ctx: Context) => {
  const page = Number(ctx.match![1]);
  const keyboard = new InlineKeyboard();
  const request: Response = await fetch("https://katsuki.moe/api/blog");
  const contents: Post[] = await request.json();

  for (const post of pager<Post>(contents, page)) {
    keyboard.url(post.title, `https://katsuki.moe/blog/${post.slug}`).row();
  }

  if (pager(contents, page - 1).length > 0) {
    keyboard.text(`⬅️ Back`, `blog_${page - 1}`);
  }

  if (pager(contents, page + 1).length > 0) {
    keyboard.text(`Next ➡️`, `blog_${page + 1}`);
  }

  await ctx.editMessageText(ctxMenuText, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

export default composer;
