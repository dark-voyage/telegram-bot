import {Composer, Context, InlineKeyboard} from "grammy";

interface Post {
  "title": string,
  "description": string,
  "slug": string,
  "date": string,
  "og": string,
  "body": null
}

const pager = (json: Record<any, any>, page_number: number, page_size = 5) => {
  return json.slice(
    (page_number - 1) * page_size,
    page_number * page_size,
  );
};

const composer = new Composer();
const ctxMenuText = `</b>Blog contents written by Yuri</b>\n\nPlease, choose one of the following options:`;

composer.command("blog", async (ctx: Context): Promise<void> => {
  const keyboard = new InlineKeyboard();
  const contents: Post[] = await (await fetch("https://katsuki.moe/api/blog")).json()

  for (const post of pager(contents, 1)) {
    keyboard.text(post.name, `blog_${post.slug}`).row();
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
  const contents: Post[] = await (await fetch("https://katsuki.moe/api/blog")).json()

  for (const post of pager(contents, page)) {
    keyboard.text(post.name, `post_${page}_${post.callback}`).row();
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

composer.callbackQuery(/^post_(\d+)_(.*)$/, async (ctx: Context) => {
  const keyboard = new InlineKeyboard();
  const page = ctx.match![1];
  const contents: Post[] = await (await fetch("https://katsuki.moe/api/blog")).json()
  const result = contents.filter((com) => com.slug === ctx.match![2]);

  if (result.length) {
    const data = result[0];

    keyboard.url(`Read on website`, `https://www.katsuki.moe/blog/${data.slug}`);
    keyboard.row().text(`🔙 Back`, `blog_${page}`);

    await ctx.editMessageText(
      `<b>${data.date}</b>` +
      `\n` +
      `<b>${data.title}</b>` +
      `\n` +
      `<i>${data.description}</i>` +
      `\n` +
      `\n` +
      `<b>${data.body}</b>`,
      {
        parse_mode: "HTML",
        reply_markup: keyboard,
      },
    );
  } else {
    await ctx.editMessageText(`<b>The post can't be found!</b>`, {
      parse_mode: "HTML",
      reply_markup: new InlineKeyboard().text(`🔙 Back`, `blog_${page}`),
    });
  }
});
export default composer;
