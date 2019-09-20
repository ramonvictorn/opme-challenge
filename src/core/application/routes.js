module.exports = initRoutes;

// controllers
const getUsersController = require('./controllers/getUsers.js');
const getUserController = require('./controllers/getUser.js');
const getUserRepositorieController = require('./controllers/getUserRepositories.js');

function initRoutes(app){
    app.get('/api/users', getUsersController)
    app.get('/api/users/:username/details', getUserController);
    app.get('/api/users/:username/repos', getUserRepositorieController);
}