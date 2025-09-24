const express=require('express');
const app=express();
const path=require('node:path');
const indexRouter = require('./routers/indexRouter');
const loginRouter = require('./routers/loginRouter');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);

app.use('/login', loginRouter);

app.get ('/register',(req,res)=>{
    res.render('register');
});

app.use((req, res, next) => {
  res.status(404).render("404", {
      user: req.user       
    });
});

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running on port 3000');
});