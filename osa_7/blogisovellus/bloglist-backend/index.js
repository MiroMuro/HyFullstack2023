const app = require("./app");
const config = require("./utils/config");
const { clog } = require("./utils/logger");

app.listen(config.PORT, () => {
  clog(`Server is running on port ${config.PORT}`);
});
