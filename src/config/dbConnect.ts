import mongoose from "mongoose";
import env from "../util/validateEnv";
export default async function connectToDatabase(): Promise<mongoose.Connection> {

  const uri: string = env.MONGO_CONNECTION_STRING_DEV;

  const options: mongoose.ConnectOptions = {};

  try {
    await mongoose.connect(uri, options);
    console.log("MongoDB database connection established successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
