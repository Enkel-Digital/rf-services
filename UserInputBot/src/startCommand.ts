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
    // Ensure that the link is not expired too
    await verifyDeeplink(SQLdb, token);

    // Reply first to tell the user that registration process just started... DB might take some time

    const { id: linkID } = await SQLdb("links")
      .where({ linkToken: token })
      .select("id");

    // Save user's details to DB
    await SQLdb("users").insert({
      linkID,
      t_chat_id: update.message.chat.id,
    });

    // @todo Kick start the survey process

    // REply message "alfred bot for ... company for ... survey"
    // Get the message from DB, construct it with the default string template
    // @todo Get these values from DB
    const surveyName = "Testing",
      companyName = "Test company";
    this.replyMessage(
      `Hey there! This is Sir Alfred getting feedback from you for the "${surveyName}" survey by "${companyName}"`
    );

    // We need to send the yes/no things
    // then the yes will trigger the start of survey handler
  } catch (error) {
    // @todo log the error to error service or something
    // @todo Change to logger instead
    console.error("Start failed with: ", error.message);
    return this.replyMessage("Sorry, but your link is invalid");
  }
};
