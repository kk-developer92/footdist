//1. Делаем все всплывающие формы по [data-modal]
//2. делаем якорный сслыки в html

//3. делаем слайды
let slides = document.querySelectorAll(".offer__slide")
let prev = document.querySelector(".offer__slider-prev")
let next = document.querySelector(".offer__slider-next")

// let slideIDX = 0

// slides.forEach(slide => slide.classList.add("hide"))
// slides[0].classList.remove("hide")

// //1-варик
// next.onclick = () => {
//     slideIDX++
//     slides[slideIDX].classList.remove("hide")

//     slides.forEach(slide => slide.classList.add("hide"))
//     slides[slideIDX].classList.remove("hide")

// }

let slideIDX = 0

let current = document.querySelector("#current")
let total = document.querySelector("#total")

current.textContent = addZero(slideIDX + 1) 
total.textContent = addZero(slides.length) 


slides.forEach(slide => slide.classList.add("hide"))
slides[slideIDX].classList.remove("hide")

function slideShow(i) {
   
    if (slideIDX > slides.length - 1) {
        slideIDX = 0
    } else if(slideIDX < 0) {
        slideIDX = slides.length - 1
    }

    slides.forEach(slide => slide.classList.add("hide"))
    slides[slideIDX].classList.remove("hide")

    // if (slideIDX -1 < 10) {
    //     current.textContent = "0" + (slideIDX + 1) 
    // } else {
    //     current.textContent = slideIDX + 1
    // }

    current.textContent = (slideIDX + 1) < 10 ?  current.textContent = "0" + (slideIDX + 1) :  current.textContent = slideIDX + 1
    current.textContent = (slideIDX + 1) < 10 ?  current.textContent = "0" + (slideIDX + 1) :  current.textContent = slideIDX + 1


}

function addZero(i) {
    return i < 10 ? `0${i}` : i
}

next.onclick = () => {
    slideShow( slideIDX++)
}


prev.onclick = () => {
    slideShow( slideIDX--)
}


//tabs
const tabs = document.querySelectorAll(".tabcontent")
const tabButtons = document.querySelectorAll(".tabheader__item")

tabShow(0)

function tabShow(i) {
    tabs.forEach(tab => tab.classList.add("hide", "fade"))
    tabs[i].classList.remove("hide")
}



tabButtons.forEach(btn => {
    btn.onclick = () => {
        tabShow(1)
    }
})


//timer 
const deadline = "2025-03-31 00:11"

function getTimer(endTime) {
    const t = Date.parse(deadline) - Date.parse(new Date())
    const days = Math.floor(t / 1000 / 60 / 60 / 24)
    const hours = Math.floor(t / 1000 / 60 / 60 % 24)
    const minutes = Math.floor(t / 1000 / 60 % 60 )
    const seconds = Math.floor(t / 1000 % 60 )

    return {t, days, hours, minutes, seconds}
}



function setTimer(deadline, selector) {
    let t = document.querySelector(selector)
    let days = t.querySelector("#days")
    let hours = t.querySelector("#hours")
    let minutes = t.querySelector("#minutes")
    let seconds = t.querySelector("#seconds")

    let interval = setInterval(updateTimer, 1000)


    const container = document.querySelector('.fireworks')
    const fireworks = new Fireworks.default(container)
    


    function updateTimer() {
    
       let t =  getTimer(deadline)
       days.textContent = String(t.days).padStart(2, 0)
       hours.textContent = String(t.hours).padStart(2, 0)
       minutes.textContent = String(t.minutes).padStart(2, 0)
       seconds.textContent = String(t.seconds).padStart(2, 0)

       if(t.t < 0) {
            fireworks.start()
            
            setTimeout(() => {
                fireworks.stop()
            }, 5000)

            clearInterval(interval)
            days.textContent = "00"
            hours.textContent = "00"
            minutes.textContent = "00"
            seconds.textContent = "00"
        }
    }

}

setTimer(deadline, ".timer")


//Calc
const gendorBtns = document.querySelectorAll("#gender .calculating__choose-item")
const inputs = document.querySelectorAll(".calculating__choose_medium input")
const actionBtns = document.querySelectorAll(".calculating__choose_big .calculating__choose-item")
const calculating__result = document.querySelector(".calculating__result span")

userData = {
    gender: "women"
}

gendorBtns.forEach(btn => {
    btn.onclick = () => {
        gendorBtns.forEach(el => el.classList.remove("calculating__choose-item_active") )
        btn.classList.add("calculating__choose-item_active")

        userData.gender = btn.dataset.gender
    } 
})

inputs.forEach(input => {
    input.oninput = () => {
        // console.log(input.id, input.value);
        userData[input.id] = input.value
    }
})

actionBtns.forEach(btn => {
    btn.onclick = () => {
        actionBtns.forEach(el => el.classList.remove("calculating__choose-item_active") )
        btn.classList.add("calculating__choose-item_active")

        userData.actions = btn.dataset.actions

        calcKkal(userData)
    } 
})

// Для женщин: 655,1 + (9,563 × вес в кг) + (1,85 × рост в см) - (4,676 × возраст в годах);
// Для мужчин: 66,5 + (13,75 × вес в кг) + (5,003 × рост в см) - (6,775 × возраст в годах).

function calcKkal(data) {
    let result = 0
    if (data.gender === "woman") {
        result = 655.1 + (9.563 * data.weight) + (1.85 * data.height) - (4.676 * data.age)
        // result = Math.round(result * data.actions)
        // console.log(result);
        
    } else {
        let result = 66.5 + (13.75 * data.weight) + (5.003 * data.height) - (6.775 * data.age)
        // result = Math.round(result * data.actions);
        // console.log(result);
    }
    result = Math.round(result * data.actions); //  вывести чтоб сократить код
    calculating__result.textContent = result

}



//DZ активность через data-action и коэфициент
//https://primekraft.ru/articles/kak-rasschitat-sutochnuyu-kalorijnost-ratsiona-formulyi-rascheta/


