"use strict"; // Enforce use of strict verion of JavaScript

import createLogger from "@lionellbriones/logging";
const logger = createLogger("middleware:404");

/**
 * @function 404 Handler for all not resource not founds
 * @notice Normal request middleware, called when no other route's are matched
 * @notice Wrapped in try/catch in case response fails.
 *
 * @Todo Log error either to error logs or to a logging service
 */
// module.exports = function (req, res, next) {
module.exports = function (req, res, next) {
  try {
    // @Todo Log error either to stderr or to a service
    logger.error(req.method, req.originalUrl);

    // res.status(404).end();
    res.status(404).json({ ok: false, error: "404" });
  } catch (err) {
    // 500 error middleware is called upon catching any errors
    next(err);
  }
};
