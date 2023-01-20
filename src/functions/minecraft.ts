import crypto from "crypto";
import type { Response as Minecraft } from "@/types/minecraft";
import { Composer, Context, InlineKeyboard, InputFile } from "grammy";

const composer = new Composer();

export const message = (data: Minecraft): string =>
  `<b>Server Stats (#${crypto.randomUUID().substring(0, 6)})!</b>` +
  `\n` +
  `\n` +
  `<b>🚨️ Online:</b> ${data.status ? "Yup" : "Nah"}` +
  `\n` +
  `<b>👥 Players:</b> <code>${data.content.players.online}/${data.content.players.max}</code>` +
  `\n` +
  `<b>➿ Software:</b> Vanilla ${data.content.version.name}` +
  `\n` +
  `<b>🎛 Address:</b> mc.cxsmxs.space` +
  `\n` +
  `\n` +
  `${
    data.content.players.sample
      ? data.content.players.sample
          .map((user) => `👾 <code>${user.name}</code>`)
          .join("\n")
      : ""
  }`;

export const keyboard = () =>
  new InlineKeyboard()
    .text("🔁 Refresh", "mc")
    .url("🔴 Web (Live)", `https://katsuki.moe/minecraft`)
    .row()
    .url("📝 Rules of the server", `https://katsuki.moe/minecraft/rules`)
    .row()
    .url("👾 Discord", "https://discord.gg/JkXFQpScFj")
    .url("🌐 Repository", `https://github.com/uwucraft`);

composer.command("mc", async (ctx: Context) => {
  try {
    await fetch("https://katsuki.moe/api/minecraft").then(
      async (r: Response) => {
        const json: Minecraft = await r.json();

        if (json.status) {
          await ctx.replyWithPhoto(
            new InputFile({
              url: "https://raw.githubusercontent.com/katsuki-yuri/website/main/public/favicons/cxsmxs.png",
            }),
            {
              caption: message(json),
              parse_mode: "HTML",
              reply_markup: keyboard(),
            }
          );
        } else {
          await ctx.reply("<b>Woah, seems like server went offline 😢.</b>", {
            parse_mode: "HTML",
          });
        }
      }
    );
  } catch (_) {
    console.error(_);
    await ctx.reply(
      "<b>Woah, seems like I'm facing some issues 😢.</b>" +
        "\n" +
        "I don't remember myself installing php, python or apache in my server 🧐",
      {
        parse_mode: "HTML",
      }
    );
  }
});

composer.callbackQuery("mc", async (ctx: Context) => {
  try {
    await fetch("https://katsuki.moe/api/minecraft").then(
      async (r: Response) => {
        const json: Minecraft = await r.json();

        if (json.status) {
          await ctx.editMessageCaption({
            caption: message(json),
            parse_mode: "HTML",
            reply_markup: keyboard(),
          });
        } else {
          await ctx.editMessageText(
            "<b>Woah, seems like server went offline 😢.</b>",
            {
              parse_mode: "HTML",
            }
          );
        }
      }
    );
  } catch (_) {
    await ctx.editMessageText(
      "<b>Woah, seems like I'm facing some issues 😢.</b>" +
        "\n" +
        "I don't remember myself installing php, python or apache in my server 🧐",
      {
        parse_mode: "HTML",
      }
    );
  }
});

export default composer;
