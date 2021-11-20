import TelegramBot from "node-telegram-bot-api";

export const sendNotification = (message) => {
  const channel = process.env.TELEGRAM_CHANNEL_ID;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  console.log("Sending Notification", !!channel, !!botToken);

  const bot = (() => {
    if (botToken && channel) {
      return new TelegramBot(botToken);
    }
  })();

  console.log("Bot Available", !!bot);

  if (bot) {
    bot.sendMessage(channel, message, { parse_mode: "HTML" });
  }
};
