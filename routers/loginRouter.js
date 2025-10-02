const express = require('express');
const router = express.Router();
//const expressSession = require('express-session');
//const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: username }
        });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
        where: { id: id }
    });
    done(null, user);
  } catch(err) {
    done(err);
  }
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/folders",
    failureRedirect: "/"
  })
);


router.get('/', (req, res) => {
    res.render('login', { user: req.user });
});


module.exports = router;