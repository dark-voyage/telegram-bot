import { Composer, Context, InlineKeyboard } from "grammy";
import { Music, Playlist } from "@/types/serverless";
import pager from "../utils/pager";

const endpoint = "https://katsuki.moe/api/music";
const composer = new Composer();

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

  await ctx.reply(ctxMenuText, {
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

  await ctx.editMessageText(ctxMenuText, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

// composer.callbackQuery(/^music_(\d+)_(.*)$/, async (ctx: Context) => {
//   const page = ctx.match![1];
//   const keyboard = new InlineKeyboard();
//
//   const request: Response = await fetch(endpoint);
//   const contents: Playlist = await request.json();
//   const result = contents.data.filter((com) => com.title === ctx.match![2]);
//
//   if (result.length) {
//     const data = result[0];
//
//     keyboard.url(`Stream the music`, data.url);
//
//     keyboard.row().text(`🔙 Back`, `playlist_${page}`);
//
//     await ctx.editMessageText(
//       `<b>${data.title} distro</b>` +
//         `\n` +
//         `\n` +
//         `<i>${data.about}</i>` +
//         `\n` +
//         `\n` +
//         `<b>Quyidagi havola yordamida sotsial tizimlariga o'ting:</b>`,
//       {
//         parse_mode: "HTML",
//         reply_markup: keyboard,
//       }
//     );
//   } else {
//     await ctx.editMessageText(`<b>The song can't be found in database!</b>`, {
//       parse_mode: "HTML",
//       reply_markup: new InlineKeyboard().text(`🔙 Back`, `playlist_${page}`),
//     });
//   }
// });
export default composer;
