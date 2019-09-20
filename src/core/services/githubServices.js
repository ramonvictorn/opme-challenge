const request = require('request');
const httpClient = require('./httpClient.js');

module.exports = {
    getUsersOnGitHub,
    getUserOnGitHub,
    getUserRepositorieOnGitHub,
}
async function getUsersOnGitHub({sinceId}){
    let bodyReturned = await httpClient({
        url:`http://api.github.com/users?since=${sinceId}`,
        method: 'GET'
    });
    let dataToReturn = {
        nextPage: bodyReturned.headers.link.split(';')[0].replace('<', '').replace('>', ''),
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