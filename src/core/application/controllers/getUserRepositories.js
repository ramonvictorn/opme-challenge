module.exports = getUserRepositorie;
const getUserRepositorieOnGitHubService = require('../../services/githubServices.js').getUserRepositorieOnGitHub;
async function getUserRepositorie(req,res){
    if(!verifyParameters(req)) {
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        username : req.query.username,
    }
    let bodyReturned = await getUserRepositorieOnGitHubService(context);
    res.send({data:bodyReturned})
}



/**
 * 
 * @param {object} request - The request object 
 * @summary - Return true if paramters is ok
 */
function verifyParameters(request){
    if(request.params.username.lenght == 0) return false;
    return true;
}