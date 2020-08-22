const container = require("./src/startup/container");
const server = container.resolve("app");
const { MONGO_URI } = container.resolve("config");

const mssql = require("mssql");
mssql.set("useCreateIndex", true);

mssql
  .connect(SQL_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => server.start())
  .catch(console.log);
