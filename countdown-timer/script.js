const newYears = '1 Jan 2021'

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secondeEl = document.getElementById('seconde');

const countDown = () => {
    const newYearsDate = new Date(newYears)
    const currentDate = new Date()

    const totalSeconds = (newYearsDate - currentDate) / 1000
    const days = Math.floor(totalSeconds / 3600 / 24)
    const hours = Math.floor(totalSeconds / 3600 ) % 24
    const minutes = Math.floor(totalSeconds / 60 ) % 60
    const seconds = Math.floor(totalSeconds) % 60
    // console.log(days, hours, minutes, seconds)
    daysEl.innerHTML = days
    hoursEl.innerHTML = formatTime(hours)
    minsEl.innerHTML = formatTime(minutes)
    secondeEl.innerHTML = formatTime(seconds)
}

const formatTime = (time) => {
    return time < 10 ? (`0${time}`) : time;
}
 
countDown()

setInterval(countDown, 1000)