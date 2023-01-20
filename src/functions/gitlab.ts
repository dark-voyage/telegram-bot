import crypto from "crypto";
import type { Response as Minecraft } from "@/types/minecraft";
import { Composer, Context, InlineKeyboard, InputFile } from "grammy";
import * as process from "process";
import { Liveness, Readiness } from "@/types/gitlab";

const composer = new Composer();

export const message = (live: Liveness, read: Readiness): string =>
  `<b>CXSMXS Space Stats (#${crypto.randomUUID().substring(0, 6)})!</b>` +
  `\n` +
  `\n` +
  `<b>🚨️ Readiness:</b> <code>${
    read.status === "ok" ? "Stable" : "Unstable"
  }</code>` +
  `\n` +
  `<b>💓 Liveness:</b> <code>${
    live.status === "ok" ? "Stable" : "Unstable"
  }</code>` +
  `\n` +
  `<b>📚 Database:</b> <code>${
    read.db_check[0].status === "ok" ? "Stable" : "Unstable"
  }</code>` +
  `\n` +
  `<b>📝 Cache:</b> <code>${
    read.cache_check[0].status === "ok" ? "Stable" : "Unstable"
  }</code>` +
  `\n` +
  `<b>👥 Sessions:</b> <code>${
    read.sessions_check[0].status === "ok" ? "Stable" : "Unstable"
  }</code>` +
  `\n` +
  `<b>➿ Shared States:</b> <code>${
    read.shared_state_check[0].status === "ok" ? "Stable" : "Unstable"
  }</code>` +
  `\n` +
  `<b>💳 Master Check:</b> <code>${
    read.master_check[0].status === "ok" ? "Stable" : "Unstable"
  }</code>` +
  `\n` +
  `<b>😺 Gitaly:</b> <code>${
    read.gitaly_check[0].status === "ok" ? "Stable" : "Unstable"
  }</code>` +
  `\n` +
  `<b>🎛 Address:</b> https://cxsmxs.space`;

export const keyboard = () =>
  new InlineKeyboard()
    .text("🔁 Refresh", "git")
    .url("🔴 Monitor", `https://cxsmxs.space/admin/health_check`)
    .row()
    .url("👾 Jobs", "https://cxsmxs.space/admin/background_jobs")
    .url("🌐 System", `https://cxsmxs.space/admin/system_info`);

composer.command("git", async (ctx: Context) => {
  try {
    const readiness: Readiness = await (
      await fetch(
        `https://cxsmxs.space/-/readiness?token=${process.env.GITLAB}&all=1`
      )
    ).json();
    const liveness: Liveness = await (
      await fetch(`https://cxsmxs.space/-/liveness?token=${process.env.GITLAB}`)
    ).json();

    await ctx.reply(message(liveness, readiness), {
      parse_mode: "HTML",
      reply_markup: keyboard(),
    });
  } catch (_) {
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

composer.callbackQuery("git", async (ctx: Context) => {
  try {
    const readiness: Readiness = await (
      await fetch(
        `https://cxsmxs.space/-/readiness?token=${process.env.GITLAB}&all=1`
      )
    ).json();
    const liveness: Liveness = await (
      await fetch(`https://cxsmxs.space/-/liveness?token=${process.env.GITLAB}`)
    ).json();

    await ctx.editMessageText(message(liveness, readiness), {
      parse_mode: "HTML",
      reply_markup: keyboard(),
    });
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
