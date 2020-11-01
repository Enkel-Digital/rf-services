/**
 * Base seed file to populate the DB with.
 * @author JJ
 */

const unixseconds = require("unixseconds");
const yesno = require("yesno");

// @todo Might want to wrap this whole thing in 1 transaction. So if any fails, everything fails and undo state change.
// So we can retry without having to keep tearing down the DB and creating a new one instead
exports.seed = async function (knex) {
  if (
    !(await yesno({
      question:
        "Are you sure you want to continue and seed DB with random test data?",
    }))
  )
    return;

  /**
   * Inserts seed entries
   * Unlike most tutorials, table contents are not deleted first before seeding.
   * Because of the Foreign Key constraints if there are any existing data.
   * Usually the easiest way, is to delete the DB itself before creating a new one and seeding it
   */

  /* Seed Tables for businesses and their employees */

  await knex("business").insert([
    {
      name: "Enkel Digital",
      email: "contact@enkeldigital.com", // Company email
      // createdBy: "",
      // approvedBy: "",
    },
  ]);

  await knex("businessUsers").insert([
    {
      businessID: 1,
      admin: true,
      // permissions:"",
      name: "Admin",
      email: "social@enkeldigital.com",
    },
    {
      businessID: 1,
      admin: false,
      // permissions:"",
      name: "JJ",
      email: "JJ@enkeldigital.com",
    },
  ]);

  // @todo Update business table to set user 1 as the creator of business 1

  /* Seed Tables for the bots and the different links for the bots */

  await knex("links").insert([
    {
      createdBy: 1,
      botID: 1,
      name: "TESTING LINK",
      description: "Link for testing",
      // Left empty as DB can generate one for us
      // linkToken: "RAND_BASE64_ENCODED_STRING",
    },
  ]);

  await knex("linkTags").insert([
    {
      linkID: 1,
      tag: "testingTag",
    },
    {
      linkID: 1,
      tag: "product:x",
    },
    {
      linkID: 1,
      tag: "newCustomer",
    },
  ]);

  /* Seed user/reviewer data */

  await knex("users").insert([
    {
      botID: 1,
      // app_UUID: "", // do we still need this??
      t_chat_id: 750165132, // Chat ID of mine (https://t.me/Jaimeloeuf)
    },
  ]);

  await knex("reviews").insert([
    {
      botID: 1,
      userID: 1,
      linkID: 1,
      message: "This is a test feedback message",
    },
  ]);

  /* Seed the billing and payments related Tables */

  await knex("subscriptionPlans").insert([
    {
      name: "Free",
      copywriting: "Test out our plan for free!",
      currency: "SGD",
      price: 0,
      totalPoints: 1000,
    },
    {
      name: "Pay As You Go",
      copywriting: "Pay as you go! Just use with our simple plan",
      currency: "SGD",
      price: "10",
      totalPoints: "10000",
    },
  ]);

  await knex("businessPlans").insert([
    {
      businessID: 1,
      planID: 1,
      start: unixseconds(),
      end: null, // No end date in sight
    },
  ]);

  await knex("topupOptions").insert([
    {
      available: true,
      name: "Missing a few points 😫",
      copywriting:
        "When you are just missing a few points before the month ends",
      currency: "SGD",
      price: 10,
      totalPoints: 5,
    },
    {
      available: true,
      name: "Cheap cheap 😁",
      copywriting: "A Cheap cheap deal to give you more!",
      currency: "SGD",
      price: 27,
      totalPoints: 15,
    },
  ]);

  await knex("businessPlanTopups").insert([
    {
      businessID: 1,
      topupID: 1,
    },
  ]);

  /* WIP seed transaction data */

  await knex("transactions").insert([
    {
      botID: 1,
      startTime: unixseconds(),
    },
  ]);
};
