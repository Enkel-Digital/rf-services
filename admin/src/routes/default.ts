/**
 * Express Router for default routes like ping
 * Mounted on /
 * @author JJ
 * @module Default routes
 */

import express from "express";
const router = express.Router();

/**
 * Returns a welcome string
 * @name GET /
 * @returns {String} welcome string
 */
router.get("/", (req, res) => res.send("RF-admin service"));

module.exports = router;
