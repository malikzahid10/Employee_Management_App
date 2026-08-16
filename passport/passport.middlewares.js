const passport = require("../passport/passport.strategy");

const authenticateJwt = passport.authenticate("jwt", { session: false });

module.exports = authenticateJwt;
