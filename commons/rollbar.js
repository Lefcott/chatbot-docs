require("./env");
const Rollbar = require("rollbar");

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV,
  verbose: true,
  itemsPerMinute: 500,
  maxItems: 500000,
});
module.exports = rollbar;
