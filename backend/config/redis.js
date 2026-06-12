import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.log("Redis err", err);
});
await redisClient.connect();
console.log("Redis Connected");

export default redisClient;
