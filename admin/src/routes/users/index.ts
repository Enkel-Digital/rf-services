/** @notice Parent router where all other routers are mounted onto. */
import express from "express";
const router = express.Router();

// Mount all the routes onto their respective base routes
router.use("/", require("./get"));
router.use("/", require("./create"));
router.use("/", require("./update"));
router.use("/", require("./del"));

module.exports = router;
