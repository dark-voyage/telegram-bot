import { Composer, Context, InlineKeyboard } from "grammy";
import { Spotify } from "@/types/serverless";
import * as crypto from "crypto";

const composer = new Composer();
const noImage = "https://katsuki.moe/favicons/no-music.png";
const endpoint = "https://katsuki.moe/api/spotify/now-playing";

export const message = (spotify: Spotify) =>
  `🎵 <b>Now playing:</b>` +
  `\n` +
  `\n` +
  `<b>Title:</b> ${spotify.title}` +
  `\n` +
  `<b>Album:</b> ${spotify.album}` +
  `\n` +
  `<b>Artist:</b> ${spotify.artist}` +
  `\n` +
  `\n`;

composer.command("playing", async (ctx: Context): Promise<void> => {
  const request: Response = await fetch(endpoint);
  const content: Spotify = await request.json();

  if (!content.isPlaying) {
    await ctx.replyWithPhoto(noImage, {
      parse_mode: "HTML",
      caption: `Yuri is not listening to anything right now. Try again later!`,
      reply_markup: new InlineKeyboard().text(`🔁 Refresh`, `playing`),
    });
  } else {
    await ctx.replyWithPhoto(content.albumImageUrl, {
      parse_mode: "HTML",
      caption: message(content),
      reply_markup: new InlineKeyboard()
        .url(`🎵 Listen on Spotify`, content.songUrl)
        .row()
        .text(`🔁 Refresh`, `playing`),
    });
  }
});

composer.callbackQuery("playing", async (ctx: Context): Promise<void> => {
  const request: Response = await fetch(endpoint);
  const content: Spotify = await request.json();

  if (!content.isPlaying) {
    await ctx.editMessageMedia(
      {
        type: "photo",
        media: noImage,
        parse_mode: "HTML",
        caption:
          `Yuri is not listening to anything right now. Try again later!` +
          `\n` +
          `\n` +
          `<code>Update #${crypto.randomInt(10000, 99999)}</code>`,
      },
      {
        reply_markup: new InlineKeyboard().text(`🔁 Refresh`, `playing`),
      }
    );
  } else {
    await ctx.editMessageMedia(
      {
        type: "photo",
        media: content.albumImageUrl,
        parse_mode: "HTML",
        caption:
          message(content) +
          `<code>Update #${crypto.randomInt(10000, 99999)}</code>`,
      },
      {
        reply_markup: new InlineKeyboard()
          .url(`🎵 Listen on Spotify`, content.songUrl)
          .row()
          .text(`🔁 Refresh`, `playing`),
      }
    );
  }
});

export default composer;
