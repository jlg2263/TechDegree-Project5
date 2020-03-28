/******************************************
Treehouse Techdegree:
FSJS Project 5 - Public API requests
******************************************/

/**
 * GLOBAL VARIABLES FOR DOM ELEMENTS TO REFERENCE
 */
const userUrl = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&nat=us';
const body = document.querySelector('body');
const searchDiv = document.querySelector('.search-container');
const galleryDiv = document.querySelector('.gallery');
let user = 0;
let userStorage = [];

// Generate Search/Form HTML
// Create form div html and append to search div
const search = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;

searchDiv.innerHTML += search;

/**
 * FETCH FUNCTIONS
 */
// Call Fetch Data and call functions with given data/result/response
fetchData(userUrl)
    .then(data => userData(data))
    .then(data => getProfiles(data))
    .then(data => cardListener(data))

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
// Store User Data for use by other functions to make more modular
function userData(data)
{   
    // Populate array with data array
    userStorage = data;
    return data;
}

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
                <img class="card-img" src=${user.picture.medium} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>`;
    });
}

// Generate Modal for user selected
function generateModal(i, data)
{
    // Create modal div html & format dob element/attribute and
    // Set user to i that was passed in
    user = i;
    const modalDiv = document.createElement('div');
    let dob = data.results[i].dob.date;
    let bday = dob.slice(0, 10);
    modalDiv.className = 'modal-container';
    modalDiv.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${data.results[i].picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                <p class="modal-text">${data.results[i].email}</p>
                <p class="modal-text cap">${data.results[i].location.city}</p>
                <hr>
                <p class="modal-text">${data.results[i].cell}</p>
                <p class="modal-text">${data.results[i].location.street.number} ${data.results[i].location.street.name}, ${data.results[i].location.city}, 
                                      ${data.results[i].location.state} ${data.results[i].location.postcode}</p>
                <p class="modal-text">Birthday: ${bday}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>`

    body.appendChild(modalDiv);

    // Call functions for buttons on modal div
    closeButton(modalDiv);
    nextButton(modalDiv, data);
    prevButton(modalDiv, data);

};

// Search User function to show user entered
const searchUser = (text, data) =>
{  
   // Set searchResults as an empty array 
   let searchResults = [];

   // Use for loop to loop through user array to search 
   for (let i = 0; i < data.results.length; i++)
   {
      // Declare local variables for search function & convert string to lowercase
      const user = data.results[i];
      const userName = user.name.first.toLowerCase();
      
      // If statement to pull results
      if (text.length !== 0 && userName.includes(text.toLowerCase()))
      {
         searchResults.push(user);
      }
   }
   return searchResults;
}


/**
 * EVENT LISTENERS
 */
// Card Event Listener for generating user modal
function cardListener()
{
    // Declare a DOM element for card div 
    const cardClicked = document.querySelectorAll('.card');

    // Use a for loop to traverse through array
    for (let i = 0; i < cardClicked.length; i++)
    {
        // Add event listener when card is selected and call generateModal
        cardClicked[i].addEventListener('click', (e) =>
        {
            generateModal(i, userStorage);
        });
    }
}

// Close/Exit Modal Listener to remove modal div
function closeButton(modalDiv)
{
    // Declare a DOM element for exit/close button on modal div
    let closeBtn = document.getElementById('modal-close-btn');

    closeBtn.addEventListener('click', (e) =>
    {
        // Remove current modal
        modalDiv.remove();
    });
}

// Next Button Modal Listener to move to next user profile in array
function nextButton(modalDiv, data)
{
    // Declare a DOM element for exit/close button on modal div
    let nextBtn = document.getElementById('modal-next');

    // Add event listener when next button is selected
    nextBtn.addEventListener('click', (e) =>
    {
        // If current user is not last element in array
        if (user < (data.results.length - 1))
        {
            // Remove current modal, increment user and call
            // generateModal function/method
            modalDiv.remove();
            user += 1;
            generateModal(user, data);
        }
    });
}

// Previous Button Modal Listener to move to next user profile in array
function prevButton(modalDiv, data)
{
    // Declare a DOM element for exit/close button on modal div
    let prevBtn = document.getElementById('modal-prev');

    // Add event listener when previous button is selected
    prevBtn.addEventListener('click', (e) =>
    {
        // If current user is not first element in array
        if (user > 0)
        {
            // Remove current modal, decrement user and call
            // generateModal function/method
            modalDiv.remove();
            user -= 1;
            generateModal(user, data);
        }
    });
}
        
// Search event handler for click to process user input
searchDiv.addEventListener('click', (event) =>
{
    event.preventDefault();
    let text = document.getElementById('search-input').value;

    // Call search user
    const numOfUserSearch = searchUser(text, userStorage);
    
    if (numOfUserSearch.length !== 0)
    {
        getProfiles(numOfUserSearch);
    }
    else
    {
        getProfiles(userStorage);
    }
});

// Search event handler for keyup
// searchDiv.addEventListener('keyup', (event) =>
// {  
//     // Call search user
//     const numOfUserSearch = searchUser(document.getElementById('search-input').value, userStorage);

//     if (numOfUserSearch.length !== 0)
//     {
//         generateModal(numOfUserSearch);
//     }
//     else
//     {
//         getProfiles(userStorage);
//     }
// });