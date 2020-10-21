/**
 * Express Router for review related routes.
 * Mounted on /reviews
 * @author JJ
 * @module Reviews routes
 *
 * @todo Add caching strategy for this routes as these are heavy SQL computations that can be cached
 */

import express from "express";
const router = express.Router();

import SQLdb from "@enkeldigital/ce-sql";
import onlyOwnResource from "../middleware/onlyOwnResource";
import auth from "../middleware/auth";

const createLogger = require("@lionellbriones/logging").default;
const logger = createLogger("routes:reviews");

/**
 * Get review stats and review IDs for bot belonging to a business
 * @name GET /reviews/bot/:botID
 * @returns {object} Review stats and an Array of review IDs that can be loaded 1 by 1 via the get reviews API
 */
router.get("/bot/:botID", async (req, res) => {
  try {
    const { botID } = req.params;

    // What happens if I use destructure syntax when the returned value is undefined? or null?
    const numberOfReviews = (
      await SQLdb("reviews")
        .where({ botID })
        .count("botID") // Need to select a specific column to count and should avoid count(*) as some drivers do not support it.
        .first()
    ).count;

    // @todo See if there is anyway I can query like this instead of doing an additional mapping later myself
    // const reviewObjectsWithOnlyIDs: Array<string> = await SQLdb("reviews")
    // String instead of Number, as id is stored as a bigint in Table
    const reviewIDs: Array<string> = await SQLdb("reviews")
      .where({ botID })
      .select("id")
      // Arbitrary limit, might need to increase for bigger customers. @todo Allow scrolling/pagination
      .limit(1000000)
      .then((reviewObjectsWithOnlyIDs: Array<{ id: string }>) =>
        reviewObjectsWithOnlyIDs.map(
          (reviewObjectsWithOnlyID) => reviewObjectsWithOnlyID.id
        )
      );

    res.json({
      ok: true,
      reviewStats: { numberOfReviews },
      reviewIDs,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

/**
 * Get review details with a reviewID
 * @name GET /reviews/details/?:reviewID||?:reviewIDs
 * @returns {object} Review object(s)
 *
 * Can support array of review IDs, instead of 1 by 1, but user/client
 * should limit the lenght too to prevent slow responses.
 */
router.get("/details/", async (req, res) => {
  try {
    const { reviewID, reviewIDs } = req.query;

    if (reviewID)
      return res.status(200).json({
        review: await SQLdb("reviews")
          .where({ id: reviewID })
          // Select only columns needed
          // botID is used so that when we return the data, the client can filter by bot IDs, or just store them together
          // userID is needed when if the business user decides to connect with them directly.
          // @todo linkID is needed to get the tags to filter these users by, or, we could just attach the links directly...
          .select("botID", "userID", "linkID", "message")
          .first(),
      });

    if (reviewIDs)
      return res.status(200).json({
        review: await SQLdb("reviews")
          // @todo How to select multiple vals???
          .where({ id: reviewID })
          // Select only columns needed
          // botID is used so that when we return the data, the client can filter by bot IDs, or just store them together
          // userID is needed when if the business user decides to connect with them directly.
          // @todo linkID is needed to get the tags to filter these users by, or, we could just attach the links directly...
          .select("botID", "userID", "linkID", "message"),
      });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

/**
 * Get reviews stats across all bots for a business. ONLY available if the business have more then 1 bots, and if the user have sufficient permissions to view bots across the entire business
 * @name GET /reviews/business/:businessID
 * @returns {object} Review stats across all bots from a business
 *
 * @todo To implement
 */
router.get("/reviews/business/:businessID", async (req, res) => {
  try {
    const { businessID } = req.params;

    // res.status(200).json({
    //   ok: true,
    //   reviewStats: { numberOfReviews },
    // });

    res.status(405).json({ ok: false, error: "unimplemented" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
