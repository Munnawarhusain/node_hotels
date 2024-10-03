const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send("This is Node_first and the server is running in better manner");
});

app.get('/chicken',function(req,res){
    res.send("Yes, I will serve chicken and sauce");
});

// Importing person routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);
// Importing menu routes
const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

app.listen(4000,() => {
    console.log("Server is running on port 4000");
});