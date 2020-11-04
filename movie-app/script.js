const apikey = "Your api"
const APIURL =
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apikey}&page=1`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    `https://api.themoviedb.org/3/search/movie?&api_key=${apikey}&query=`;

const mainEl = document.getElementById('main')
const searchEl = document.getElementById('search')
const formEl = document.getElementById('form')

const getClassByRate = (vote) => {
    if(vote >= 8) {
        return 'green'
    }else if(vote >= 5) {
        return 'orange'
    }else {
        return 'red'
    }
}

const showMovies = (movies) => {
    //clear main
    mainEl.innerHTML = ''

    movies.forEach(movie => {
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <img src="${IMGPATH + movie.poster_path}" 
             alt="${movie.title}" />
            <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview: </h3>
                ${movie.overview}
            </div>
        `
        mainEl.appendChild(movieEl)
    });
    
}

const getMovies = async (url) => {
    const resp = await fetch(url)
    const respData = await resp.json()
    showMovies(respData.results)
}

// initially get fav moive
getMovies(APIURL)

formEl.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchText = searchEl.value
    if(searchText) {
        getMovies(SEARCHAPI+searchText)

        searchEl.value = ''
    }
})