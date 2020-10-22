/** @notice Parent router where all other routers are mounted onto. */
import express from "express";
const router = express.Router();

import auth from "../middleware/auth";

// Mount all the routes onto their respective base routes
router.use("/", require("./default"));
router.use("/user", auth, require("./users"));
router.use("/bot", auth, require("./bot"));
router.use("/reviews", require("./reviews"));
router.use("/links", require("./links"));

module.exports = router;
