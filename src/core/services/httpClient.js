const request = require('request');
module.exports = httpClient;
async function httpClient({url,method}){
    let option = {
        method: method,
        uri: url,
        headers: {
            'User-Agent': 'Awesome-Octocat-App',
        },
    }   
    return new Promise((resolve,reject) => {
        request(option, function (error, response, body) {
            if(response && response.statusCode != 200){
                // resolve("ERRO_ON_REQUEST");
                console.log('ERROR_ON_REQUEST');
                resolve({
                    error:'ERROR_ON_REQUEST',
                });
            }
            resolve({
                body:JSON.parse(response.body),
                headers:response.headers,
            });
        });    
    });
}