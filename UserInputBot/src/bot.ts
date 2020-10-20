require("dotenv").config();

import yatbl from "yatbl";

function _newBot(BOT_TOKEN): yatbl.Bot {
  // Start a bot using the bare Bot Class without
  const bot = new yatbl.Bot(BOT_TOKEN);

  /* Register all the bot shortHands */
  bot.addShortHand(yatbl.shortHands.replyMessage);

  /* Register all the command handlers */
  bot.onCommand("start", require("./startCommand"));
  bot.onCommand("unsub", require("./unsub"));

  // Use different bots depending on what type of bot to run
  if (process.env.NODE_ENV === "production") return bot;
  else {
    // Basically create a new PollingBot for its polling mechanism, but use the same bot._onUpdate call directly
    const PollingBot = new yatbl.PollingBot(BOT_TOKEN);
    PollingBot._onUpdate = bot._onUpdate;
    PollingBot.startPolling(0);
    return PollingBot;
  }
}

const botCache: { [key: string]: yatbl.Bot } = {};

export default function newBot(BOT_TOKEN): yatbl.Bot {
  if (botCache[BOT_TOKEN]) return botCache[BOT_TOKEN];

  const bot: typeof yatbl.Bot = _newBot(BOT_TOKEN);
  botCache[BOT_TOKEN] = bot;
  return bot;
}
