/**
 * Express Router for bot configuration related routes
 * Mounted on /bot
 * @author JJ
 * @module Bot configuration APIs
 *
 * This router is mounted on a auth protected route,
 * thus individual auth verifier middleware not needed
 */

import express from "express";
const router = express.Router();

import SQLdb from "@enkeldigital/ce-sql";
import onlyOwnResource from "../middleware/onlyOwnResource";

import createLogger from "@lionellbriones/logging";
const logger = createLogger("routes:users");

/**
 * Get Bot details
 * @name GET /bot/:botID
 * @returns {object} Bot details object
 */
router.get("/:botID", onlyOwnResource, async (req, res) => {
  try {
    const { botID } = req.params;

    // @todo Filter columns, and leave out data like the token?
    const bot = await SQLdb("bots").where({ id: botID }).first();

    if (bot) res.json({ ok: true, bot });
    else res.status(404).json({ ok: false, error: "No such bot" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

/**
 * Get details for all the Bots of a business
 * @name GET /bot/all/:businessID
 * @returns {Array<Object>} Array of Bot details object
 *
 * @todo Ensure businessID is valid and auth token must verify that it is this business
 */
router.get("/all/:businessID", onlyOwnResource, async (req, res) => {
  try {
    const { businessID } = req.params;

    const bots = await SQLdb("bots")
      .where({ businessID })
      .select("id", "createdAt", "createdBy", "name", "description")
      // Not neccessarily needed, but makes it easier for the client
      .orderBy("createdAt", "desc");

    res.status(200).json({ ok: true, bots });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

/**
 * Save new bot
 * @name POST /bot/new
 * @param {String} botID
 * @param {Object} user
 * @returns {object} ok indicator
 *
 * @todo Limit this, so this needs to hook up with the billing service.
 * @todo Should support like a hook system.
 * All the things that should be ran when a new user is created should be posted here as a hook
 * then on user creation, either call all the hooks, or publish a event for all the listeners to use.
 */
router.post("/new", express.json(), async (req, res) => {
  try {
    const { bot } = req.body;

    // @todo Check with Billing service that business is still able to create another bot

    // Save the bot details and token
    // @todo Token might be stored somewhere else in the future
    await SQLdb("bots").insert(bot);

    // Only run this via the admin service when the bot is first connected to our service
    // Set/register bot commands with tele API
    // require("./setCommands")(tapiFF(bot.token));

    res.status(201).json({ ok: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

/**
 * Update bot details
 * @name PUT /bot/:botID
 * @returns {object} ok indicator
 */
router.put("/:botID", (req, res) => {
  res.json({ ok: false, error: "not implemented yet" });
});

/**
 * Delete bot
 * @name DELETE /bot/:botID
 * @function
 * @returns {object} ok indicator
 */
router.delete("/:botID", async (req, res) => {
  try {
    const { botID } = req.params;

    // @todo Do a real delete instead of this
    await SQLdb("userAccounts").where({ id: botID }).update({ deleted: true });

    // @todo Update billing status

    res.json({ ok: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
