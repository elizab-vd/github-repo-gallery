//div with profile information
const profileInfo = document.querySelector(".overview");
//GitHub username
const username = "elizab-vd";
const gitHubInfo = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const userData = await res.json();
    console.log(userData);
    showGitHubInfo(userData);
};

gitHubInfo();

const showGitHubInfo = function (userData) {
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
     
}