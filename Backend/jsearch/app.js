const express = require('express');
const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
const bodyParser = require('body-parser');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(bodyParser.json());
app.use(authRoutes);
app.use(feedRoutes);
app.use((error, req, res, next) => { 
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

app.use((req, res, next) => {
    console.log('Not Found 404');
});
app.use
mongoose.connect('mongodb+srv://shouryaa:shouryaa@cluster0.d0fqi.mongodb.net/jsearch', { useUnifiedTopology: true }).then(result => {
    console.log('DB Connected');
    app.listen(8080);
   
   
})
.catch (err => {
    console.log(err);
})


