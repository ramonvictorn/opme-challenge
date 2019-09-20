const request = require('request');
const httpClient = require('./httpClient.js');

module.exports = {
    getUsersOnGitHub,
    getUserOnGitHub,
    getUserRepositorieOnGitHub,
}
async function getUsersOnGitHub({sinceId}){
    dataToReturn= {};
    let bodyReturned = await httpClient({
        url:`http://api.github.com/users?since=${sinceId}`,
        method: 'GET'
    });
    // if(bodyReturned.headers && bodyReturned.headers.link){
    //     let parts = bodyReturned.headers.link.split(';')
    //     // [0].replace('<', '').replace('>', '') 
    //     console.log('parts ', parts)
    // }
    if(bodyReturned.error){
        return dataToReturn.error = 'ERROR_ON_REQUEST'; 
    }
    dataToReturn = {
         nextPage: bodyReturned.headers && bodyReturned.headers.link 
            ? bodyReturned.headers.link.split(';')[0].replace('<', '').replace('>', '') 
            : 0,
        users : bodyReturned.body,
    }
    return dataToReturn; 
}



async function getUserOnGitHub({username}){
    let bodyReturned = await httpClient({
        url:`http://api.github.com/users/${username}`,
        method: 'GET'
    });
    let dataToReturn = {
        user : bodyReturned.body,
    }
    return dataToReturn; 
}

async function getUserRepositorieOnGitHub({username}){
    let bodyReturned = await httpClient({
        url:`http://api.github.com/users/${username}/repos`,
        method: 'GET'
    });
    let dataToReturn = {
        repositories : bodyReturned.body,
    }
    return dataToReturn; 
}