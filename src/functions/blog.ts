import { Composer, Context, InlineKeyboard } from "grammy";

interface Post {
  title: string;
  description: string;
  slug: string;
  date: string;
  og: string;
  body: null;
}

const pager = (json: Record<any, any>, page_number: number, page_size = 5) => {
  return json.slice((page_number - 1) * page_size, page_number * page_size);
};

const composer = new Composer();
const ctxMenuText =
  `<b>Blog contents written by Yuri</b>` +
  `\n` +
  `\n` +
  `Please, choose one of the following options:`;

composer.command("blog", async (ctx: Context): Promise<void> => {
  const keyboard = new InlineKeyboard();
  const contents: Post[] = await (
    await fetch("https://katsuki.moe/api/blog")
  ).json();

  for (const post of pager(contents, 1)) {
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
  const contents: Post[] = await (
    await fetch("https://katsuki.moe/api/blog")
  ).json();

  for (const post of pager(contents, page)) {
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
