const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();
require("./models");

PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log(`App start on Port : ${PORT}`);
  } catch (error) {
    console.log("Unable to connect to Database", error);
  }
});
