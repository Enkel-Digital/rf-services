"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const createLogger = require("@lionellbriones/logging").default;
const logger = createLogger("index.js:Server Setup");
function setup(resolve) {
    return __awaiter(this, void 0, void 0, function* () {
        yield require("./setup/initializeDbAbstractions");
        logger.info("Completed calls to all Setup/Check/Verification modules.");
        const corsOptions = {
            origin: "*",
            credentials: false,
        };
        if (process.env.NODE_ENV === "development")
            app.use(require("morgan")("tiny"));
        app.use(cors(corsOptions));
        app.use(helmet());
        app.use(compression());
        app.use("/", require("./routes"));
        app.use(require("./middleware/404"));
        app.use(require("./middleware/500"));
        const port = process.env.PORT || 3000;
        const server = app.listen(port, () => logger.info(`Server running on port: ${port}`));
        return resolve(server);
    });
}
module.exports = new Promise(setup);
