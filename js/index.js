/*add an event listener to the form submission */

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input');
  const searchType = document.querySelector('#search-type');
  const searchTerm = searchInput.value;

  if (searchType.value === 'user') {
    await searchUsers(searchTerm);
  } else {
    await searchRepos(searchTerm);
  }
});



/*create a function to search for users */

const searchUsers = async (searchTerm) => {
    const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });
  
    const data = await response.json();
    displayUsers(data.items);
  };



  /*create a function to search for repositories */

  const searchRepos = async (searchTerm) => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });
  
    const data = await response.json();
    displayRepos(data.items);
  };



  /*create a function to display users*/
  
  const displayUsers = (users) => {
  const userList = document.querySelector('#user-list');
  userList.innerHTML = '';

  users.forEach((user) => {
    const userElement = document.createElement('li');
    userElement.innerHTML = `
      <a href="#" data-username="${user.login}">
        <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
        <span>${user.login}</span>
      </a>
    `;

    userList.appendChild(userElement);
  });

  addUserListeners(users);
};


/*create a function to add event listeners to users */
const addUserListeners = (users) => {
    const userList = document.querySelector('#user-list');
    userList.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        const username = event.target.dataset.username;
        searchRepos(username);
      }
    });
  };


/* create a function to display repositories*/
const displayRepos = (repos) => {
  const repoList = document.querySelector('#repo-list');
  repoList.innerHTML = '';

  repos.forEach((repo) => {
    const repoElement = document.createElement('li');
    repoElement.innerHTML = `
      <a href="${repo.html_url}" target="_blank">
        <span>${repo.name}</span>
      </a>
    `;

    repoList.appendChild(repoElement);
  });
};



/* add a button to toggle search type*/
<button id="search-type">Search Users</button>

/*add an event listener to toggle search type */
const searchTypeButton = document.querySelector('#search-type');
searchTypeButton.addEventListener('click', () => {
  if (searchTypeButton.textContent === 'Search Users') {
    searchTypeButton.textContent = 'Search Repos';
  } else {
    searchTypeButton.textContent = 'Search Users';
  }
});

//now the app should search for users or repos based on the search type and
//display the results accordingly
