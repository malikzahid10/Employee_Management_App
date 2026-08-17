const express = require("express");
const userRouter = require("./routes/user.routes");
const permissionRouter = require("./routes/permission.routes");
const employeeRouter = require("./routes/employee.routes");
const passport = require("passport");
const roleRouter = require("./routes/role.routes");

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use("/api/users", userRouter);
app.use("/api/permissions", permissionRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/roles", roleRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Employee Application Created!",
  });
});

module.exports = app;
