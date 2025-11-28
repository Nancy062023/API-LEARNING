const express = require('express');
const sequelize = require('./config/db.js');


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
