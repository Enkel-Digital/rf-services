/**
 * Handler for start commands, where users register their
 * @todo Accept startGroup command too
 * @todo Perhaps allow an array instead of just a single command.
 */

import SQLdb from "@enkeldigital/ce-sql";
import verifyDeeplink from "./verifyDeeplink";

// Using module.exports as we are doing a require in the caller code
module.exports = async function (parsedCommand, update) {
  try {
    const deepLinkingArgs = parsedCommand[0];

    // If the arguement for the first start command is null (empty) and no need to await too.
    if (!deepLinkingArgs)
      return this.replyMessage("Invalid registration link!");

    // @todo Parse and verify token before using its data
    const token = deepLinkingArgs[0];

    // register the user
    // @todo Handle re-registrations, should not have double registration
    console.log("Deeplink token:", token);
    console.log("User's chat ID:", update.message.chat.id);

    // @todo Verify the deeplink
    await verifyDeeplink(SQLdb, token);

    // Reply first to tell the user that registration process just started... DB might take some time

    // @todo Save the user's details in the DB

    // Get from DB what product/tag the deeplink represents and let the user know what channel are they sending feedback to
    // this.replyMessage(`Feedback channel/link for ${deeplink}`);

    // @todo Customize this message, can be set by biz user
    this.replyMessage("Send whatever feedback you have here!");
  } catch (error) {
    // @todo log the error to error service or something
    console.error("Registration failed with: ", error.message);
    return this.replyMessage("Registration failed!");
  }
};
