const { filter } = require("@lefcott/filter-json");

require("./env");

const redis = require("redis").createClient(process.env.REDISCLOUD_URL);

redis.on("error", (err) => {
  console.error(`Redis error: ${err}`);
});

redis.on("end", () => {
  console.log("Redis connection closed");
});

redis.on("connect", () => {
  console.log("Connected to REDIS!");
});

redis.Add = (key, reg) =>
  new Promise((resolve) => {
    redis.sadd(key, JSON.stringify(reg), (error, data) => {
      if (error) {
        console.error(error);
        return resolve(null);
      }
      resolve(data);
    });
  });
redis.Find = (key, where) =>
  new Promise((resolve) => {
    redis.smembers(key, (error, data) => {
      if (error) {
        console.error(error);
        return resolve(null);
      }
      data = data.map((reg) => JSON.parse(reg));
      resolve(filter(data, where));
    });
  });

module.exports = redis;
