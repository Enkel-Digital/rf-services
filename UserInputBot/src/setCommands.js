const { shortHands } = require("yatbl");

// @todo Dont repeat this... this should be ran for each bot, ON their bot token registration event.
// Set the list of commands first on startup
module.exports = (tapi) =>
  shortHands.setCommands(tapi, [
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show the help menu" },
    { command: "settings", description: "Edit settings of bot" },
    { command: "unsub", description: "Unsubscribe from all notifications" },
  ]);
