module.exports = (SQLdb) =>
  async function (_, update) {
    try {
      // using chat id instead of from id, allow grp notifs, so like unsub from grp instead of just a user
      console.log("unsub:", update.message.from.id);
      console.log("unsub:", update.message.chat.id);

      // Remove the user
      // @todo Actually when the user is unsubbing, we need to somehow figure out which bot they unsub from too, not unsub from all bots...
      await SQLdb("users")
        .where({
          // @todo To get this value from token too instead of hardcoding it
          botID: 1,
          t_chat_id: update.message.chat.id,
        })
        .del();

      this.replyMessage("Successfully unsubscribed from notifications!");

      // Handle if user is not subbed, we should be able to tell and let them know that they were not subbed in the first place
      // this.replyMessage("User was not registered previously");
    } catch (error) {
      // @todo log the error
      console.error("Registration failed with: ", error.message);
      return this.replyMessage("Registration failed!");
    }
  };
