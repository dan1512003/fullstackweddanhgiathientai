const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose =require('mongoose')
const session =require('express-session')
const cors =require('cors')
var ee = require('@google/earthengine');


mongoose.connect(process.env.DB_URL);
const db=mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('Connected to the database'))
app.use(cors())
app.use(express.json())
app.use(session({
    secret: 'my secret key',  
    resave: false,              
    saveUninitialized: true,    
}))
app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views','page'))
app.use('/page',express.static(path.join(__dirname,'views','page')))
app.use('/public',express.static(path.join(__dirname,'public')))
app.use('/upload',express.static(path.join(__dirname,'upload')))
app.use('/bootstrap',express.static(path.join(__dirname,'assets','bootstrap-5.3.3-dist','css')))
app.use('/ckeditor',express.static(path.join(__dirname,'assets','ckeditor')))
const todoRoutes = require('./routes/router');
const { error } = require('console');

app.use('/todos',todoRoutes)


const PORT =process.env.PORT  ;

app.listen(PORT,()=> {

    console.log(`listening on port ${PORT}`);
});
