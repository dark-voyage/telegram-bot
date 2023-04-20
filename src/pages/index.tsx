import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Yuri&#39;s Telegram</title>
        <meta
          name="description"
          content="Telegram bot application written on Next.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Telegram bot is working at&nbsp;
            <code className={styles.code}>@yurioonbot</code>
          </p>
          <div>
            <a
              href="https://katsuki.moe"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/yuri-text.svg"
                alt="Yuri"
                className={styles.yuriLogo}
                width={100}
                height={28}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.thirteen}>
            <Image src="/yuri.svg" alt="Yuri" width={60} height={60} priority />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://github.com/katsuki-yuri/telegram-bot"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Repository <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Open the repository.</p>
          </a>

          <a
            href="https://t.me/yurioonbot"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Telegram <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Chat with the bot!</p>
          </a>

          <a
            href="https://github.com/katsuki-yuri"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              GitHub <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Visit Yuri&#39;s GitHub page.</p>
          </a>

          <a
            href="https://t.me/yurionblog"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Channel <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Visit Yuri&#39;s channel on Telegram.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
