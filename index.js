const express=require('express');
const app=express();
const path=require('node:path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running on port 3000');
});