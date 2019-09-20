module.exports = getUser;
const getUserOnGitHubService = require('../../services/githubServices.js').getUserOnGitHub;
async function getUser(req,res){
    if(!verifyParameters(req)) {
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        username : req.params.username,
    }
    let bodyReturned = await getUserOnGitHubService(context);
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