//div with profile information
const profileInfo = document.querySelector(".overview");
//GitHub username
const username = "elizab-vd";
//ul to display repos 
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");

const gitUserInfo = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const userData = await res.json();
    console.log(userData);
    showGitUserInfo(userData);
};

gitUserInfo();

const showGitUserInfo = function (userData) {
     const userInfo = document.createElement("div");
     userInfo.classList.add("user-info");
     userInfo.innerHTML = `
     <figure>
     <img alt="user avatar" src=${userData.avatar_url} />
   </figure>
   <div>
     <p><strong>Name:</strong> ${userData.name}</p>
     <p><strong>Bio:</strong> ${userData.bio}</p>
     <p><strong>Location:</strong> ${userData.location}</p>
     <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
   </div>
   `;
   profileInfo.append(userInfo);
   getRepos();
     
};

const getRepos = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const repoData = await res.json();
    console.log(repoData);
    showRepos(repoData);
};

const showRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }  
};

repoList.addEventListener("click", function (e){
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const fetchRepoInfo = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    );

    const repoInfo = await fetchRepoInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch (repoInfo.languages_url);

    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    const languages = [];
    for(const language in languageData){
        languages.push(language);
    }

    console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

displayRepoInfo = function (repoInfo, languages) {
    repoDataSection.innerHTML = "";
    const repoData = document.createElement("div");
    repoData.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
       <p>Description: ${repoInfo.description}</p>
       <p>Default Branch: ${repoInfo.default_branch}</p>
       <p>Languages: ${languages.join(", ")}</p>
       <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;

    repoDataSection.append(repoData);
    repoDataSection.classList.remove("hide");
    repoSection.classList.add("hide");
};




