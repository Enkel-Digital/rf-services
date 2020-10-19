/**
 * Verify that the deep link is valid
 * @param {*} SQLdb
 * @param {String} token
 *
 * @todo Implement it and remove this scaffold
 */
module.exports = async (SQLdb, token) => {
  const pendingUser = await SQLdb("pending_users")
    .where({ token })
    .select("botID", "app_UUID");

  // Ensure that there is a valid pending user
  if (!pendingUser)
    throw new Error("Invalid token! Contact app developer for help"); // @todo Might allow devs to customize error message
};
