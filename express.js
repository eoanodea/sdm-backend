import express from "express";

import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import messageRoutes from "./routes/message.routes";
import { config } from "process";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

/**
 * Body parsing
 */
app.use("*", bodyParser.json());

/**
 * Body parser URL Encoding
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compress());

/**
 * secure apps by setting various HTTP headers
 */
app.use(helmet());

/**
 * CORS Options
 * Only allow requests from the client origin
 */
const corsOptions = {
  origin: "https://secure.eoan.ie",
  optionsSuccessStatus: 200,
};

/**
 * Enable CORS - Cross Origin Resource Sharing
 */

app.use(cors(corsOptions));

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use("/api", messageRoutes);

// app.get("/api/messages/:passcode", function (req, res) {
//   const { passcode } = req.params;
//   console.log("api", req.params.passcode);

//   const messageI = messages.findIndex(
//     (message) => message.passcode === passcode && !message.destroyed
//   );
//   if (messageI !== -1) return res.status(200).json(messages[messageI]);

//   return res.status(400).json("Not Found");
// });

// app.get("/api/messages/destroy/:id", function (req, res) {
//   const { id } = req.params;

//   const messageI = messages.findIndex((message) => message.id === id);

//   if (messageI !== -1) {
//     messages[messageI].destroyed = true;
//     return res.status(200).json("Destroyed");
//   }

//   return res.status(400).json("Not Found");
// });

export default app;
