import mongoose from "mongoose";
import { _urlConnection } from "./config.js";

/**
 * Connect to the database using the URI variable, and use the unified topology and
 * new URL parser.
 */
export async function connectDb() {
  await mongoose.connect(_urlConnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}
