/**
 * Express Router for user related routes
 * Mounted on /user
 * @author JJ
 * @module User routes
 *
 * This router is mounted on a auth protected route,
 * thus individual auth verifier middleware not needed
 */

import express from "express";
const router = express.Router();

import SQLdb from "@enkeldigital/ce-sql";

import createLogger from "@lionellbriones/logging";
const logger = createLogger("routes:users:create");

/**
 * Create new user details object
 * @name POST /user/new/
 * @param {String} userID
 * @param {Object} user
 * @returns {object} ok indicator
 *
 * @todo Set restrictions on who can call this API
 * @todo Should support like a hook system.
 * All the things that should be ran when a new user is created should be posted here as a hook
 * then on user creation, either call all the hooks, or publish a event for all the listeners to use.
 */
router.post("/new", express.json(), async (req, res) => {
  try {
    // Refer to notes for why we are enforcing this lowercase usage.
    req.body.user.email = req.body.user.email.toLowerCase();
    const user = req.body.user;

    await SQLdb("userAccounts").insert(user);

    res.status(201).json({ ok: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
