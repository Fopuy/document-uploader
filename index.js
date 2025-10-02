const express=require('express');
const app=express();
const path=require('node:path');
const indexRouter = require('./routers/indexRouter');
const loginRouter = require('./routers/loginRouter');
const registerRouter = require('./routers/registerRouter');
const folderRouter = require('./routers/folderRouter');
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma');
const passport = require('passport');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    cookie: {
     maxAge: 60 * 60 * 1000 // ms
    },
    secret: 'joshuadejesus',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

app.use('/login', loginRouter);

app.use('/folders', folderRouter);

app.use('/register', registerRouter);

app.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/'); // or wherever you want  
  });
});

app.use((req, res, next) => {
  res.status(404).render("404", {
      user: req.user       
    });
});

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running on port 3000');
});