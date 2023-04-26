import { Composer, Context } from "grammy";
import * as start from "@/functions/start";

const composer = new Composer();

export const message =
  `<b>⚠️ Available commands:</b>` +
  `\n` +
  `\n` +
  `/help - <code>show this message</code>` +
  `\n` +
  `/blog - <code>listing blog posts</code>` +
  `\n` +
  `/playing - <code>music i'm listening</code>` +
  `\n` +
  `/playlist - <code>my collection of music</code>` +
  `\n` +
  `/socials - <code>social networks</code>` +
  `\n` +
  `/sponsors - <code>motivation for yuri</code>` +
  `\n`;

export const keyboard = start.keyboard;

composer.command("help", async (ctx: Context): Promise<void> => {
  await ctx.reply(message, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

export default composer;
