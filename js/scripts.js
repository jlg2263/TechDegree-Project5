// Tech Degree - Project 5 - Public API requests

// Create global variables from the DOM
const searchDiv = document.querySelector('.search-container');
const galleryDiv = document.querySelector('.gallery');


/**
 * Fetch functions
 */ 

// Fetch Data and return result
fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => console.log(data));

// function fetchData (url)
// {
//     return fetch(url)
//         .then(checkStatus)
//         .then(res => res.json())
//         .catch(error => console.log('There was a problem with the request.', error));
//     }

// Promise.all(
//     [
//         fetchData('https://randomuser.me/api/')
//     ]    
// )
// .then(data => 
//     {

//     }
// )

/**
 * Helper Functions
 */

// Check Status of Response
// function checkStatus (response)
// {
//     if(response.ok)
//     {
//         return Promise.resolve(response);
//     }
//     else
//     {
//         return Promise.reject(new Error(resposne.statusText));
//     }
// }

// // Generate Photos 
// function (generatePhoto(data))
// {

// }