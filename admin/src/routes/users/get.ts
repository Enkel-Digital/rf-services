/**
 * Mounted on /user
 * @author JJ
 * @module Get User API
 *
 * This router is mounted on a auth protected route,
 * thus individual auth verifier middleware not needed
 */

import express from "express";
const router = express.Router();

import SQLdb from "@enkeldigital/ce-sql";
import onlyOwnResource from "../../middleware/onlyOwnResource";

import createLogger from "@lionellbriones/logging";
const logger = createLogger("routes:users:get");

/**
 * Get user details object
 * @name GET /user/:userEmail
 * @returns {object} User object
 */
router.get("/:userEmail", onlyOwnResource, async (req, res) => {
  try {
    const { userEmail } = req.params;

    const user = await SQLdb("businessUsers")
      .where({ email: userEmail })
      // Only select columns needed
      .select("businessID", "admin", "permissions", "name", "email")
      .first();

    if (user) res.json({ ok: true, user });
    else res.status(404).json({ ok: false, error: "No such user" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
