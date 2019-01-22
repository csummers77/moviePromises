// JS is a async lang
// async?
// console.log('1');
// setTimeout(()=>{
//     console.log('2');
// },0)
// console.log('3');
const apiBaseUrl = 'http://api.themoviedb.org/3';
const apiKey = 'fec8b5ab27b292a68294261bb21b04a5';
const request = require('request');
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
// get now playing movies.
// get, from the movie DataCue, the cast data
// get, from cast data, an individual actor
// get, individual actor, highest grossing movie
// let movieData = '';
// promise is a constructor/class. built into js
// make a new one with 'new' keyword
// it takes one arg a callback
// 1.resolve
// 2.reject
const moviePromise = new Promise((resolve,reject)=>{
    request.get(nowPlayingUrl,(err,response,body)=>{
        // when we call reject, the outside world will
        // know, our promise has failed,
        if(err){
            reject(err);
        }
        const parsedBody = JSON.parse(body);
        // console.log(parsedBody);
        // when we call resolve, the outside world
        // will know the promise is done
        movieData = parsedBody;
        resolve(parsedBody);
    })
})

// a promise has a then. The then will run whenever
// resolve is called inside the promise
moviePromise.then((dataGivenToResolve)=>{
    return new Promise((resolve,reject)=>{
         // console.log(dataGivenToResolve)
        const id = dataGivenToResolve.results[0].id 
        const castUrl = `${apiBaseUrl}/movie${id}/credits?api_key=${apiKey}`
        console.log(castUrl)
        request.get(castUrl,(err,response,body)=>{
            const parsedBody = JSON.parse(body)
            resolve(parsedBody);
         })
   
    })
}).then((actorData)=>{
    console.log(actorData)
    const actorid = actorData[0].id;
    const peopleUrl = `${apiBaseUrl}/person/${actorid}?api_key=${apiKey}`;
    request.get(peopleUrl,(err,response,body)=>{
        const parsedBody = JSON.parse(body)
        resolve(parsedBody);
    })
})
// console.log(moviePromise);





