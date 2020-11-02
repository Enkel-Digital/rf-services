require("dotenv").config();

import yatbl from "yatbl";

export default function newBot(BOT_TOKEN): yatbl.Bot {
  // Start a bot using the bare Bot Class without
  const bot = new yatbl.Bot(BOT_TOKEN);

  /* Register all the bot shortHands */
  bot.addShortHand(yatbl.shortHands.replyMessage);

  /* Register all the command handlers */
  bot.onCommand("start", require("./startCommand"));
  bot.onCommand("unsub", require("./unsubCommand"));
  bot.onMessage(require("./survey"));

  // // Use different bots depending on what type of bot to run
  if (process.env.NODE_ENV === "production") return bot;
  else {
    // Create new PollingBot for its polling mechanism, but use the same bot.handlers and bot._shortHands loaded onto the object previously.
    const PollingBot = new yatbl.PollingBot(BOT_TOKEN);
    PollingBot.handlers = bot.handlers;
    PollingBot._shortHands = bot._shortHands;
    PollingBot.startPolling(0);
    return PollingBot;
  }
}
