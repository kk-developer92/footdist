//1. Делаем все всплывающие формы по [data-modal]
//2. делаем якорный сслыки в html

//3. делаем слайды
let slides = document.querySelectorAll(".offer__slide")
let prev = document.querySelector("offer__slider-prev")
let next = document.querySelector("offer__slider-next")
//выполнение задание 
let current = document.querySelector("#current")
let total = document.querySelector("#total")

let slideIDX = 0

//:::1
slides.forEach(slide => slide.classList.add("hide"))
slides[0].classList.remove("hide")

//1-варик
// next.onclick = () => {
//     slideIDX++
//     slides[slideIDX].classList.remove("hide")

//     slides.forEach(slide => slide.classList.add("hide"))
//     slides[slideIDX].classList.remove("hide")

// }

//2 варик использовать функцию
slideShow()
function slideShow(i) {
    if(i > slides.length - 1) {
        slideIDX = 0;
    } else if (i < 0) {
        slideIDX = slides.length - 1;
    }
    /* переместил с первого варианта :::1*/
    slides.forEach(slide => slide.classList.add("hide", "fade"))
    slides[0].classList.remove("hide")

    /* задание */
    current.innerHTML =  slideIDX + 1 < 10 ? `0${slideIDX + 1}` : slideIDX + 1
    total.innerHTML =  slides.length < 10 ? `0${slides.length}` : slides.length // лучше переместить вверх чтобы каждый раз не вызвался
    
    // current.innerHTML =  addZero(slideIDX + 1)
  
} 

//добавляем там где нужно выводить 0
function addZero(i) {
    return i < 10 ? `0${i}` : i
}

next.onclick = () => {
    slideShow(++slideIDX)
}

prev.onclick = () => {
    slideShow(--slideIDX)
}


//timer

// const input = document.querySelector("#time")
// input.onchange = () => console.log(input.value);

const deadline = "2025-04-30 00:00"

function getTimer(endTime) {
    // const t = Date.parse(endTime)
    const t =  Date.parse(endTime) - Date.parse(new Date()) 
    const days = Math.floor(t / 1000 / 60 / 60 / 24)
    const hours = Math.floor(t / 1000 / 60 / 60 % 24)
    const minutes = Math.floor(t / 1000 / 60 % 60 )
    const seconds = Math.floor(t / 1000 % 60 )

    return {t, days, hours, minutes, seconds};
    
}

function setTimer (endTime, selector) {
    const t = document.querySelector(selector)
    const days = t.querySelector("#days")
    const hours = t.querySelector("#hours")
    const minutes = t.querySelector("#minutes")
    const seconds = t.querySelector("#seconds")

    // updateTimer()
    let interval = setInterval(updateTimer, 1000)

    function updateTimer() {
        const t = getTimer(endTime)

        /* задание для чего нужно interval  и t  */
        if(t.t < 0) {
            clearInterval(interval)
        }


        days.textContent = String(t.days).padStart(2, "0")
        hours.textContent = String(t.hours).padStart(2, "0")
        minutes.textContent = String(t.minutes).padStart(2, "0")
        seconds.textContent = String(t.seconds).padStart(2, "0")
    }

    
}

setTimer(deadline, ".timer")
// console.log(
//     getRamaingTime(deadline)
// );

