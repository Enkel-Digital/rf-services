/**
 * Mounted on /user
 * @author JJ
 * @module Delete User API
 *
 * This router is mounted on a auth protected route,
 * thus individual auth verifier middleware not needed
 */

import express from "express";
const router = express.Router();

import SQLdb from "@enkeldigital/ce-sql";
import onlyOwnResource from "../../middleware/onlyOwnResource";

import createLogger from "@lionellbriones/logging";
const logger = createLogger("routes:users:del");

/**
 * Delete user account
 * @name DELETE /user/:userID
 * @function
 * @param {object} user
 * @returns {object} ok indicator
 */
router.delete("/:userID", express.json(), onlyOwnResource, async (req, res) => {
  try {
    const { userID } = req.params;

    await SQLdb("userAccounts").where({ id: userID }).update({ deleted: true });

    res.json({ ok: true });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
