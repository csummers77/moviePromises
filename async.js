// async is promises, made easy
// they were added in e8
const apiBaseUrl = 'http://api.themoviedb.org/3';
const apiKey = 'fec8b5ab27b292a68294261bb21b04a5';
const request = require('request');
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`

function getNowPlaying(){
    return new Promise((resolve,reject)=>{
        request.get(nowPlayingUrl,(err,response,body)=>{
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
        })
    })
}

function getCast(movieId){
    return new Promise((resolve, reject)=>{
        const castUrl = `${apiBaseUrl}/movie/${movieId}/credits?api_key=${apiKey}`
        request.get(castUrl,(error,response,body)=>{
            const parsedBody = JSON.parse(body);
            resolve(parsedBody);
        })
    })
}

function getPerson(personId){
    return new Promise((resolve, reject)=>{
        const pesronUrl = `${apiBaseUrl}/person/${personId}?api_key=${apiKey}`
        request.get(personUrl,(err,response,body)=>{
            const parsedData = JSON.parse(body);
            resolve(parsedData)
        })
    })
}

async function run(){
    const movieData = await getNowPlaying();
    const castData = await getCast(movieData.results[0].id); 
    const personData = await getPerson(castData.cast[0].id);
    console.log(personData)
}
run();

