
import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
  MONGO_CONNECTION_STRING_DEV: str(),
  PORT: port({default: 5000}),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  SESSION_SECRET: str()
});

export default env

