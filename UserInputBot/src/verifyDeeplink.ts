/**
 * Verify that the deep link is valid
 */
export default async function (SQLdb, token: String) {
  const validLink = await SQLdb("links")
    .where({ linkToken: token })
    .select("botID")
    .first(); // There should only be 1 row anyways since linkToken has a unique constraint on it

  // Ensure link is valid
  // @todo Might allow devs to customize error message
  if (!validLink)
    throw new Error("Invalid token! Contact app developer for help");
}
