const passport = require("passport");

const { ExtractJwt, Strategy } = require("passport-jwt");
const { User } = require("../models");
require("dotenv").config();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    async (payload, done) => {
      const user = await User.findOne({
        where: { id: payload.id, isActive: true },
      });
      if (!user) {
        return done(null, false);
      }
      return done(null, payload);
    },
  ),
);

module.exports = passport;
