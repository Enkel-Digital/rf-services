require("dotenv").config();

const yatbl = require("yatbl");
const SQLdb = require("@enkeldigital/ce-sql");

// Use different bots depending on what type of bot to run
const bot = new (process.env.NODE_ENV === "production"
  ? yatbl.WebhookBot
  : yatbl.PollingBot)(process.env.BOT_TOKEN);

const tapi = bot.tapi;

// Set/register bot commands with tele API
require("./setCommands")(tapi);

bot.addShortHand(yatbl.shortHands.replyMessage);

/**
 * Handler for start commands, where users register their
 * @todo Accept startGroup command too
 * @todo Perhaps allow an array instead of just a single command.
 */
bot.onCommand("start", async function (parsedCommand, update) {
  try {
    const deepLinkingArgs = parsedCommand[0];

    // If the arguement for the first start command is null (empty) and no need to await too.
    if (!deepLinkingArgs)
      return this.replyMessage("Invalid registration link!");

    // register the user
    // @todo Handle re-registrations, should not have double registration
    console.log("Deeplink:", deepLinkingArgs[0]);
    console.log("User's chat ID:", update.message.chat.id);

    // Reply first to tell the user that registration process just started... DB might take some time

    // @todo Parse and verify token before using its data
    const token = deepLinkingArgs[0];

    // @todo Verify the deeplink
    // require("./verifyDeeplink")(SQLdb, token);

    // @todo Save the user's details in the DB

    // Get from DB what product/tag the deeplink represents and let the user know what channel are they sending feedback to
    // this.replyMessage(`Feedback channel/link for ${deeplink}`);

    this.replyMessage("Send whatever feedback you have here!");
  } catch (error) {
    // @todo log the error
    console.error("Registration failed with: ", error.message);
    return this.replyMessage("Registration failed!");
  }
});

bot.onCommand("unsub", require("./unsub")(SQLdb));

// Use different bots depending on what type of bot to run
if (process.env.NODE_ENV === "production") bot.startServer();
else bot.startPolling(0);
