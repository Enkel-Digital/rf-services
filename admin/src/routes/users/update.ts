/**
 * Mounted on /user
 * @author JJ
 * @module Update User API
 *
 * This router is mounted on a auth protected route,
 * thus individual auth verifier middleware not needed
 */

import express from "express";
const router = express.Router();

import SQLdb from "@enkeldigital/ce-sql";
import onlyOwnResource from "../../middleware/onlyOwnResource";

import createLogger from "@lionellbriones/logging";
const logger = createLogger("routes:users:update");

/**
 * Update user details object
 * @name PUT /user/:userID
 * @returns {object} ok indicator
 */
router.put("/", onlyOwnResource, (req, res) => {
  try {
    res.json({ ok: false, error: "unimplemented" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
