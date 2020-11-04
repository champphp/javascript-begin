const apikey = "Your api"

const mainEl = document.getElementById('main')
const formEl = document.getElementById('form')
const searchEl = document.getElementById('search')


const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`


formEl.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = searchEl.value

  if(location) {
    getWeatherByLocation(location)
  }
  // searchEl.value = ''
})

const addWeatherToPage = (data) => {
  mainEl.innerHTML = ''
  const temp = KtoC(data.main.temp)

  const weather = document.createElement('div')
  weather.classList.add('weather')
  weather.innerHTML = `

    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
    <small>${data.weather[0].main}</small>
  `
  mainEl.appendChild(weather)
}

const KtoC = (K) => {
  return Math.floor(K - 273.15)
}

const getWeatherByLocation = async (location) => {
  const resp = await fetch(url(location))
  const respData = await resp.json()

  addWeatherToPage(respData)
}

// getWeatherByLocation('London')