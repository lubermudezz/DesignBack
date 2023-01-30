const express = require ('express')
const app = express()
const morgan = require ('morgan')
var cors = require('cors')
const routes = require('./routes')

app.use(cors()) 
app.use(express.json());

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });



app.use('/', routes)

app.use((req, res, next) => {
    res.status(404).send('404 Not Found')
})

module.exports = app;