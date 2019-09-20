// require packages
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const routes = require('./core/application/routes.js');
const app = express();
// middlewares
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true
}));

routes(app);
app.listen(4646,()=>{
    console.log('Server Listening on 4646')
});