// require packages
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./core/application/routes.js');
const setting = require('../src/settings.js');
const app = express();
// middlewares
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true
}));

// static files

app.use('/assets', express.static(__dirname + '/web/public/assets/'))

routes(app);
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname+'/web/public/views/index.html'));
})
app.listen(setting.APP_PORT,()=>{
    console.log(`Server Listening on ${setting.APP_PORT} `)
});