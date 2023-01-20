import { Composer, Context } from "grammy";
import * as start from "@/functions/start";

const composer = new Composer();

export const message =
  `<b>Send an anonymous message to Yuri. Example:</b>` +
  `\n` +
  `/send hello yuri-kun! how you doin?`;

export const keyboard = start.keyboard;

composer.command("message", async (ctx: Context): Promise<void> => {
  await ctx.reply(message, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

export default composer;
