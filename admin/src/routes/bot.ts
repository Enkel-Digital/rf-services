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

    if (bot) res.json({ success: true, bot });
    else res.status(404).json({ success: false, error: "No such bot" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Save new bot
 * @name POST /bot/new
 * @param {String} botID
 * @param {Object} user
 * @returns {object} success indicator
 *
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

    res.status(201).json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Update bot details
 * @name PUT /bot/:botID
 * @returns {object} success indicator
 */
router.put("/:botID", (req, res) => {
  res.json({ success: false, error: "not implemented yet" });
});

/**
 * Delete bot
 * @name DELETE /bot/:botID
 * @function
 * @returns {object} Success indicator
 */
router.delete("/:botID", async (req, res) => {
  try {
    const { botID } = req.params;

    // @todo Do a real delete instead of this
    await SQLdb("userAccounts").where({ id: botID }).update({ deleted: true });

    // @todo Update billing status

    res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
