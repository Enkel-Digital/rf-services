require("dotenv").config();

import yatbl from "yatbl";
import SQLdb from "@enkeldigital/ce-sql";

// Use different bots depending on what type of bot to run
const bot = new (process.env.NODE_ENV === "production"
  ? yatbl.WebhookBot
  : yatbl.PollingBot)(process.env.BOT_TOKEN);

const tapi = bot.tapi;

// Set/register bot commands with tele API
require("./setCommands")(tapi);

/* Register all the bot shortHands */
bot.addShortHand(yatbl.shortHands.replyMessage);

/* Register all the command handlers */
bot.onCommand("start", require("./startCommand"));
bot.onCommand("unsub", require("./unsub")(SQLdb));

// Use different bots depending on what type of bot to run
if (process.env.NODE_ENV === "production") bot.startServer();
else bot.startPolling(0);
