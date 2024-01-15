document.addEventListener(&#39;DOMContentLoaded&#39;, function () {
    const searchForm = document.getElementById(&#39;github-form&#39;);
     if (searchForm) {
     searchForm.addEventListener(&#39;submit&#39;, function (e) {
     e.preventDefault();
     const searchedUserInput = document.getElementById(&#39;search&#39;).value;
     fetch(`https://api.github.com/search/users?q=${searchedUserInput}`, {
     method: &#39;GET&#39;,
     headers: {
     &#39;Content-Type&#39;: &#39;application/json&#39;,
     &#39;Accept&#39;: &#39;application/vnd.github.v3+json&#39;
     },
     })
     .then(response =&gt; response.json())
     .then(data =&gt; {
     const userList = document.getElementById(&#39;user-list&#39;);
     userList.innerHTML = &#39;&#39;;
     data.items.forEach(user =&gt; {
     const listItem = document.createElement(&#39;li&#39;);
     // Add a click event listener to the list item to display
    user repositories
     listItem.addEventListener(&#39;click&#39;, function () {
     getUserRepos(user.login);
     });
     listItem.innerHTML = `
     &lt;img src=&quot;${user.avatar_url}&quot; alt=&quot;${user.login}&quot; /&gt;
     &lt;div&gt;
     &lt;p&gt;&lt;strong&gt;${user.login}&lt;/strong&gt;&lt;/p&gt;
     &lt;p&gt;Profile URL: &lt;a href=&quot;${user.html_url}&quot;
    target=&quot;_blank&quot;&gt;${user.html_url}&lt;/a&gt;&lt;/p&gt;
     &lt;/div&gt;`;
     userList.appendChild(listItem);
     });
     })
     .catch(error =&gt; {
     console.error(&#39;Error fetching user information:&#39;, error);
     });
     });
    
     } else {
     console.error(&quot;Element with id &#39;github-form&#39; not found&quot;);
     }
    });
    function getUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
     method: &#39;GET&#39;,
     headers: {
     &#39;Content-Type&#39;: &#39;application/json&#39;,
     &#39;Accept&#39;: &#39;application/vnd.github.v3+json&#39;
     },
     })
     .then(response =&gt; response.json())
     .then(repos =&gt; {
     const reposList = document.getElementById(&#39;repos-list&#39;);
     reposList.innerHTML = &#39;&#39;;
     repos.forEach(repo =&gt; {
     const repoItem = document.createElement(&#39;li&#39;);
     repoItem.innerHTML = `
     &lt;p&gt;&lt;strong&gt;${repo.name}&lt;/strong&gt;&lt;/p&gt;
     &lt;p&gt;Description: ${repo.description || &#39;N/A&#39;}&lt;/p&gt;
     &lt;p&gt;URL: &lt;a href=&quot;${repo.html_url}&quot;
    target=&quot;_blank&quot;&gt;${repo.html_url}&lt;/a&gt;&lt;/p&gt;`;
     reposList.appendChild(repoItem);
     });
     })
     .catch(error =&gt; {
     console.error(`Error fetching repositories for ${username}:`, error);
     });
    }
    
    &lt;html&gt;
    &lt;head&gt;
     &lt;meta charset=&#39;UTF-8&#39;/&gt;
     &lt;meta name=&#39;viewport&#39; content=&#39;width=device-width, initial-scale=1.0&#39;/&gt;
     &lt;meta http-equiv=&#39;X-UA-Compatible&#39; content=&#39;ie=edge&#39;/&gt;
     &lt;title&gt;Document&lt;/title&gt;
     &lt;script src=&#39;./js/index.js&#39;&gt;&lt;/script&gt;
     &lt;link rel=&#39;stylesheet&#39; href=&#39;index.css&#39;/&gt;
    &lt;/head&gt;
    &lt;body&gt;
     &lt;div id=&#39;main&#39;&gt;
     &lt;h2&gt;GitHub Search&lt;/h2&gt;
     &lt;form id=&#39;github-form&#39;&gt;
     &lt;input id=&#39;search&#39; type=&#39;text&#39; name=&#39;search&#39;&gt;
     &lt;input type=&#39;submit&#39; name=&#39;submit&#39;/&gt;
     &lt;/form&gt;
     &lt;div id=&#39;github-container&#39;&gt;
     &lt;ul id=&#39;user-list&#39;&gt;&lt;/ul&gt;
     &lt;ul id=&#39;repos-list&#39;&gt;&lt;/ul&gt;
    
     &lt;/div&gt;
     &lt;/div&gt;
    &lt;/body&gt;
    &lt;/html&gt;