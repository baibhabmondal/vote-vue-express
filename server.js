const express = require('express')
const serveStatic = require('serve-static')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./backend_routes/index');
const path = require('path')

const app = express()



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router);

mongoose.connect('mongodb://baibhab:pass1234@ds163701.mlab.com:63701/coda-fullstack', { useNewUrlParser: true }).then(function (data) {
    console.log("database set up")
}).catch(function (err) {
    console.log(err)
});




//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))
// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 3000
app.listen(port)
console.log(`app is listening on port: ${port}`)