const env = {
  REDISCLOUD_URL:
    "redis://rediscloud:JkDuAcH2nEZ3gEe24H0upZaaPt2KQJZR@redis-16739.c52.us-east-1-4.ec2.cloud.redislabs.com:16739",
  ROLLBAR_ACCESS_TOKEN: "f50524c0073f461989bc5796890eb589",
  SECRET: "WidergyDocsSecret",
};

const keys = Object.keys(env);
keys.forEach((key) => (process.env[key] = env[key]));
