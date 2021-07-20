//div with profile information
const profileInfo = document.querySelector(".overview");
//GitHub username
const username = "elizab-vd";
const gitHubInfo = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const projects = await res.json();
    console.log(projects);
};

gitHubInfo();