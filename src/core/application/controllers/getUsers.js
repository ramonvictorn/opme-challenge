module.exports = getUsers;
const getUsersOnGitHubService = require('../../services/githubServices.js').getUsersOnGitHub;
async function getUsers(req,res){
    if(!verifyParameters(req)) {
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        sinceId : req.query.since,
    }
    let bodyReturned = await getUsersOnGitHubService(context);
    res.send({data:bodyReturned})
}



/**
 * 
 * @param {object} request - The request object 
 * @summary - Return true if paramters is ok
 */
function verifyParameters(request){
    if(isNaN(request.query.since)) return false;
    return true;
}