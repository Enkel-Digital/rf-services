/**
 * Base seed file to populate the DB with.
 * @author JJ
 */

const unixseconds = require("unixseconds");
const yesno = require("yesno");

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

  /* Seed Tables for the bots and the different links for the bots */

  await knex("bots").insert([
    {
      createdBy: 1,
      businessID: 1,
      name: "Feedback bot",
      description: "Bot for getting feedback from users",
      // @todo Might move token away from SQL db in the future
      // token: "", // @todo Put the actual token here!
      token: process.env.testBot_BOT_TOKEN,
    },
  ]);

  await knex("links").insert([
    {
      createdBy: 1,
      botID: 1,
      linkToken: "RAND_BASE64_ENCODED_STRING",
    },
  ]);

  /* Seed user/reviewer data */

  await knex("users").insert([
    {
      botID: 1,
      app_UUID: "", // do we still need this??
      t_chat_id: 750165132, // Chat ID of mine (https://t.me/Jaimeloeuf)
    },
  ]);

  /* await knex("classTags").insert([
    {
      classID: 1,
      tag: "music",
    },
    {
      classID: 1,
      tag: "guitar",
    },
    {
      classID: 1,
      tag: "instrument",
    },
    {
      classID: 1,
      tag: "beginner",
    },
    {
      classID: 2,
      tag: "music",
    },
    {
      classID: 2,
      tag: "guitar",
    },
    {
      classID: 2,
      tag: "instrument",
    },
    {
      classID: 2,
      tag: "advanced",
    },
    {
      classID: 2,
      tag: "professional",
    },
    {
      classID: 3,
      tag: "cooking",
    },
    {
      classID: 3,
      tag: "lifestyle",
    },
    {
      classID: 3,
      tag: "beginner",
    },
    {
      classID: 3,
      tag: "easy",
    },
    {
      classID: 4,
      tag: "cooking",
    },
    {
      classID: 4,
      tag: "lifestyle",
    },
    {
      classID: 4,
      tag: "advanced",
    },
    {
      classID: 4,
      tag: "professional",
    },
  ]); */

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
      userID: 1,
      topupID: 2,
    },
  ]);

  /*  */

  await knex("transactions").insert([
    {
      botID: 1,
      startTime: unixseconds(),
    },
  ]);
};
