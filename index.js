var express = require('express')
var app = express();
var pool = require('./queries.js')
var things = require('./things.js');

app.use('/things', things)


pool.connect((err, res)=>{
    console.log(err)
    console.log('Connected')
})

app.listen(3000)