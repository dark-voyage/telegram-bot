<header>
<img src="https://www.orzklv.uz/favicons/logo.png" alt="logo" height="100" align="left">
<h1 style="display: inline">Telegram Bot</h1>

Telegram bot that uses Next.js API and Serverless (SWC for local development).

[![GitHub top language](https://img.shields.io/github/languages/top/orzklv/telegram-bot?style=flat-square&logo=github)](https://github.com/orzklv/telegram-bot)
[![Channel](https://img.shields.io/badge/Chat-grey?style=flat-square&logo=telegram)](https://t.me/orzklvb)
[![Test CI](https://github.com/orzklv/telegram-bot/actions/workflows/test.yml/badge.svg)](https://github.com/orzklv/telegram-bot/actions/workflows/test.yml)
</header>

## About

Telegram bot built on top of Next.js Serverless API. I used [grammy](https://grammy.dev/) as the Telegram bot framework.

> I host all contents statically, so you may correct me up by sending a pull request.

## Features

- Webhook and Polling at the same time
- Extended configurations
- Spotify integration
- Docker image for easy deployment

## Development

In order to run the website, just install the latest LTS version of Node.js (it's 18.x.x at the moment) and make sure you have pnpm installed globally. Then run
the following commands:

```bash
pnpm install
export TOKEN="<your telegram bot token>"
pnpm run polling:dev
```

## Docker

Also, you may actually run the docker image hosted on GitHub Container Registry:

```bash
docker run -p 3000:3000 ghcr.io/orzklv/telegram-bot:latest
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
