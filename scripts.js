let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endtime = document.querySelector(".display__end-time")
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
    //clear any existing timer
    clearInterval(countdown)
    const now = Date.now()
    const then = now + seconds * 1000
    displayTimeLeft(seconds)
    displaEndTime(then)
    
   countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        //check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(countdown)
            return
        }
        //display it
        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft (seconds) {
    const minutes = Math.floor(seconds/60)
    const remainderSeconds = seconds % 60
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    document.title = display
    timerDisplay.textContent = display
}

function displaEndTime (timestamp) {
    const end = new Date(timestamp)
    const hour = end.getHours()
    const minutes = end.getMinutes()
    endtime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
}
function startTimer() {
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}
buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const mins = this.minutes.value
    timer(mins * 60)
    this.reset()
})