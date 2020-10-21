require("dotenv").config();

import yatbl from "yatbl";

function _newBot(BOT_TOKEN): yatbl.Bot {
  // Start a bot using the bare Bot Class without
  const bot = new yatbl.Bot(BOT_TOKEN);

  /* Register all the bot shortHands */
  bot.addShortHand(yatbl.shortHands.replyMessage);

  /* Register all the command handlers */
  bot.onCommand("start", require("./startCommand"));
  bot.onCommand("unsub", require("./unsubCommand"));
  bot.onMessage(require("./feedbackHandler"));

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

const botCache: { [key: string]: yatbl.Bot } = {};

/**
 * WIP, final API --> getBot(businessID, BOT_TOKEN)
 *
 * Will throw error if businessID maps to invalid Bot
 * Will return a new bot if no bot of this token is running
 * will return the existing bot if there is already a bot started up.
 *
 * @param BOT_TOKEN
 * @returns Bot
 */
export default function newBot(BOT_TOKEN): yatbl.Bot {
  if (botCache[BOT_TOKEN]) return botCache[BOT_TOKEN];

  const bot: typeof yatbl.Bot = _newBot(BOT_TOKEN);
  botCache[BOT_TOKEN] = bot;
  return bot;
}
