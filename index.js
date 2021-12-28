const express = require('express');
require('dotenv').config();

const fileRoute = require('./routes/fileRouter')

const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';


app.get('/', (req, res, next) => {
    res.send('hello world')
})
app.use('/file', fileRoute)

app.listen(port, () => {
    console.log(`server started at http://${host}:${process.env.PORT}`)
})