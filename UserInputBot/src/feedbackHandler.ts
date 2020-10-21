/**
 * Handler for start commands, where users register their
 * @todo Accept startGroup command too
 * @todo Perhaps allow an array instead of just a single command.
 */

import SQLdb from "@enkeldigital/ce-sql";

// Using module.exports as we are doing a require in the caller code
module.exports = async function (update) {
  try {
    console.log("User's chat ID:", update.message.chat.id);
    console.log("feedback handler is called");

    // @todo Check if we have the users details before
    // await verifyDeeplink(SQLdb, token);

    // What if they are not registered? So like no id?
    // Create a new user then?
    const { userID } = await SQLdb("users")
      .where({ t_chat_id: update.message.chat.id })
      .first()
      .select("id");

    await SQLdb("reviews").insert({
      botID: "",
      // again, how do I get user ID here?
      // userID: "",
      userID,
      linkID: "",

      // @todo Just like the getMessage shorthand right, what if people send us things like picture/video?
      // How do we download these assets? Or how do we show it/play it via the user portal?
      message: update.message.text,
    });

    // @todo Allow biz users to customize this?
    this.replyMessage(
      "Thanks for your feedback! Our staff will take a look into this, and respond if needed."
    );
  } catch (error) {
    // @todo log the error to error service or something
    console.error("Registration failed with: ", error.message);
    return this.replyMessage("Registration failed!");
  }
};
