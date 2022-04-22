import TelegramBot from "node-telegram-bot-api";

export const sendNotification = async (message, payload) => {
  const channel = process.env.TELEGRAM_CHANNEL_ID;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  const bot = (() => {
    if (botToken && channel) {
      return new TelegramBot(botToken);
    }
  })();

  if (bot) {
    await bot.sendMessage(channel, message, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "👍",
              callback_data: "true",
            },
            {
              text: "👎",
              callback_data: "false",
            },
          ],
        ],
      },
    });
  }
};
