/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

// Retrieves mongoDB uri
const MONGODB_URI = process.env.MONGODB_URI!;

// Handles abscence of mongoDB uri
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// cache connection to mongoDB
const cached = (global as any).mongoose || { conn: null, promise: null };

/*
Handles connection to mongoDB. It determines if there a cached connection or 
if a new one needs to be created. 
*/
export async function connectDB() {
  // checks and returns cached connection
  if (cached.conn) return cached.conn;

  // if cached not present, create new connection
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string);
  }

  // return connection
  cached.conn = await cached.promise;
  (global as any).mongoose = cached;

  return cached.conn;
}
