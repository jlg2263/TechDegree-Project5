/******************************************
Treehouse Techdegree:
FSJS Project 5 - Public API requests
******************************************/

/**
 * GLOBAL VARIABLES FOR DOM ELEMENTS TO REFERENCE
 */
const userUrl = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&nat=us';
const body = document.getElementsByTagName('body');
const searchDiv = document.querySelector('.search-container');
const galleryDiv = document.querySelector('.gallery');
let userStorage = '';

/**
 * FETCH FUNCTIONS
 */
// Call Fetch Data and call functions with given data/result/response
fetchData(userUrl)
    .then(data => getProfiles(data))
    .then(data => userData(data))
    .then(data => generateSearch(data));

// Request data using fetch api
function fetchData(url)
{
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => 
        {   
            galleryDiv.innerHTML = '<h3>Something went wrong!</h3>';
            console.log('There was a problem with the request!', error);
        });
}

// Check Status of Response
function checkStatus (response)
{
    // If ok return resolve else reject
    if(response.ok)
    {
        return Promise.resolve(response);
    }
    else
    {
        return Promise.reject(new Error(resposne.statusText));
    }
}

/**
 * HELPER FUNCTIONS
 */
// Generate HTML for each user/profiles
function getProfiles(data)
{
    // Use map to create new array 
    // and create card div html and append to gallery div per user
    data.results.map( user =>
    {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        galleryDiv.appendChild(cardDiv);
        cardDiv.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src=${user.picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>`;
    });
}

// Store User Data for use by other functions to make more modular
function userData(data)
{
    return userStorage = data;
}

// Generate Search/Form HTML
function generateSearch()
{
    // Create form div html and append to search div
    const search = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;

    searchDiv.innerHTML += search;
}

// Generate Modal for user selected
function generateModal(user)
{
    // Create modal div html 
    const modalDiv = document.createElement('div');
    let bday = data.results[user].dob.slice(0, 10);
    modalDiv.className = 'modal-container';
    modalDiv.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${data.results[user].picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.results[user].name.first} ${user.name.last}</h3>
                <p class="modal-text">${data.results[user].email}</p>
                <p class="modal-text cap">${data.results[user].location.city}</p>
                <hr>
                <p class="modal-text">${data.results[user].cell}</p>
                <p class="modal-text">${data.results[user].location.street.number} ${data.results[user].location.street.name}, ${data.results[user].location.city}, 
                                      ${data.results[user].location.state} ${data.results[user].location.postcode}</p>
                <p class="modal-text">Birthday: ${bday}</p>
            </div>
        </div>

        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>`

    body[0].appendChild(modalDiv);
};

/**
 * GET DATA
 */
//function searchData(e)
//{
 //   e.preventDefault();
//}

/**
 * EVENT LISTENERS
 */
// Card Event Listener for generating user modal
function cardListener()
{
    // Declare a DOM element for card div 
    const cardClicked = document.querySelectorAll('.card');

    // Use a for of loop to traverse through array
    for (let user of cardClicked)
    {
        // Add event listener when card is selected and call generateModal
        cardClicked[user].addEventListener('click', (event) =>
        {
            generateModal(user);
        })
    }
}