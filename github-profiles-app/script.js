const APIURL = "https://api.github.com/users/";

const mainEl = document.getElementById('main')
const formEl = document.getElementById('form')
const serachEl = document.getElementById('search')

const createUserCard = (user) => {
  const cardHTML = `
  <div class="card">
    <div class="img-container">
      <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>

      <ul class="info">
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>
      <h4>Repos: </h4>
      <div id="repos"></div>
    </div>
  </div>
  `

  mainEl.innerHTML = cardHTML
}

const addReposToCard = (repos) => {
  const reposEl = document.getElementById('repos')

  repos
    .sort((a,b) => b.stargazers_count - a.stargazers_count)
    .slice(0,9)
    .forEach(repo => {
    const repoEl = document.createElement('a')
    repoEl.classList.add('repo')
    repoEl.href = repo.html_url
    repoEl.target = '_blank'
    repoEl.innerText = repo.name

    reposEl.appendChild(repoEl)
  });

}

const getReposUsername = async (user) => {
  const resp = await fetch(APIURL + user +'/repos')
  const respData = await resp.json()

  addReposToCard(respData)
}

const getUser = async (user) => {
  const resp = await fetch(APIURL + user)
  const respData = await resp.json()

  createUserCard(respData)
  getReposUsername(user)
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchText = serachEl.value

  if(searchText) {
    getUser(searchText)

    serachEl.value = ''
  }
})

getUser('champphp')