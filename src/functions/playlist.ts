import { Composer, Context, InlineKeyboard } from "grammy";
import { Music, Playlist } from "@/types/serverless";
import pager from "../utils/pager";

const composer = new Composer();
const noImage = "https://katsuki.moe/favicons/playlist.png";
const noMusic = "https://katsuki.moe/favicons/no-music.png";
const endpoint = "https://katsuki.moe/api/music";

const ctxMenuText =
  `<b>Favorite handpicked music list by Yuri</b>` +
  `\n` +
  `\n` +
  `Please, choose one of the following options:`;

composer.command("playlist", async (ctx: Context): Promise<void> => {
  const keyboard = new InlineKeyboard();
  const request: Response = await fetch(endpoint);
  const contents: Playlist = await request.json();

  for (const music of pager<Music>(contents.data, 1)) {
    keyboard.text(music.title, `music_1_${music.title}`).row();
  }

  if (pager(contents.data, 2).length > 0) {
    keyboard.text(`Next ➡️`, `playlist_2`);
  }

  await ctx.replyWithPhoto(noImage, {
    caption: ctxMenuText,
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

composer.callbackQuery(/^playlist_(\d+)$/, async (ctx: Context) => {
  const page = Number(ctx.match![1]);
  const keyboard = new InlineKeyboard();
  const request: Response = await fetch(endpoint);
  const contents: Playlist = await request.json();

  for (const music of pager<Music>(contents.data, page)) {
    keyboard.text(music.title, `music_${page}_${music.title}`).row();
  }

  if (pager(contents.data, page - 1).length > 0) {
    keyboard.text(`⬅️ Back`, `playlist_${page - 1}`);
  }

  if (pager(contents.data, page + 1).length > 0) {
    keyboard.text(`Next ➡️`, `playlist_${page + 1}`);
  }

  await ctx.editMessageMedia(
    {
      type: "photo",
      media: noImage,
      caption: ctxMenuText,
      parse_mode: "HTML",
    },
    {
      reply_markup: keyboard,
    }
  );
});

composer.callbackQuery(/^music_(\d+)_(.*)$/, async (ctx: Context) => {
  const page = ctx.match![1];
  const keyboard = new InlineKeyboard();

  const request: Response = await fetch(endpoint);
  const contents: Playlist = await request.json();
  const result = contents.data.filter((com) => com.title === ctx.match![2]);

  if (result.length) {
    const data = result[0];

    keyboard.url(`Stream the music`, data.url);

    keyboard.row().text(`🔙 Back`, `playlist_${page}`);

    await ctx.editMessageMedia(
      {
        type: "photo",
        media: data.image,
        caption: `<b>${data.title}</b>` + `\n` + `<i>${data.description}</i>`,
        parse_mode: "HTML",
      },
      {
        reply_markup: keyboard,
      }
    );
  } else {
    await ctx.editMessageMedia(
      {
        type: "photo",
        media: noMusic,
        caption: `<b>The song can't be found in the database!</b>`,
        parse_mode: "HTML",
      },
      {
        reply_markup: new InlineKeyboard().text(`🔙 Back`, `playlist_${page}`),
      }
    );
  }
});

export default composer;
