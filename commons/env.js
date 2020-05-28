const env = {
  REDISCLOUD_URL:
    "redis://rediscloud:QE4z245uuCLgrzMCKGBoj3htJTrjpz4B@redis-10921.c44.us-east-1-2.ec2.cloud.redislabs.com:10921",
  ROLLBAR_ACCESS_TOKEN: "f46a983237494c3d932a038d13cfa0e2",
  SECRET: "WidergyDocsSecret",
};

const keys = Object.keys(env);
keys.forEach((key) => (process.env[key] = env[key]));
