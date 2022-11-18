let showedCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let moves = 0;
let hits = 0;
let showMoves = document.getElementById("moves");
let showHits = document.getElementById("hits");
let showTime = document.getElementById("time");
let timer = 30;
let initialTimer = 30;
let clockId = null;
let clock = false;
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let winAudio = new Audio('./sounds/win.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');
let rightAudio = new Audio('./sounds/right.wav');
let clickAudio = new Audio('./sounds/click.wav');
let loseAudio = new Audio('./sounds/lose.wav');

numbers = numbers.sort(() => {return Math.random()-0.5});

function countTimer(){
    clockId = setInterval(() => {
        timer--;
        showTime.innerHTML = `Tiempo: ${timer}s`;
        if(timer == 0) {
            clearInterval(clockId);
            blockCards();
            showTime.innerHTML = `Tiempo: 0s`;
            timer=false;
            loseAudio.play();
        }
    },1000);
}

function blockCards(){
    showedCards = 0;
    card1 = null;
    card2 = null;
    firstResult = null;
    secondResult = null;
    for (let i = 0; i<=15; i++) {
        let blockedCard = document.getElementById(i);
        blockedCard.innerHTML = `<img src="./img/${numbers[i]}.png" alt="">`;
        blockedCard.disabled = true;
    }
}

function resetGame()
{
    clickAudio.play();
    clearInterval(clockId);
    showedCards = 0;
    showMoves = document.getElementById("moves");
    showHits = document.getElementById("hits");
    showTime = document.getElementById("time");
    timer = 30;
    initialTimer = 30;
    numbers = numbers.sort(() => {return Math.random()-0.5});
    showHits.innerHTML = `Aciertos: 0`;
    showTime.innerHTML = `Tiempo: 30s`
    showMoves.innerHTML = `Movimientos: 0`;
    clockId = null;
    clock = false;
    for (let i = 0; i<=15; i++) {
        let blockedCard = document.getElementById(i);
        blockedCard.innerHTML = ' ';
        blockedCard.disabled = false;
    }
}


function show(id) {
    if(clock == false) {
        countTimer();
        clock = true;
    }
    
    showedCards++;
    if(showedCards == 1){
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.innerHTML = `<img src="./img/${firstResult}.png" alt="">`;
        card1.disabled = true;
        clickAudio.play();
    }else if(showedCards == 2) {
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="./img/${secondResult}.png" alt="">`;;
        card2.disabled = true;
        moves++;
        showMoves.innerHTML = `Movimientos: ${moves}`;
        if(firstResult == secondResult) {
        card1 = null;
        card2 = null;
        firstResult = null;
        secondResult = null;
            showedCards = 0;
            hits++;
            showHits.innerHTML = `Aciertos: ${hits}`;
            rightAudio.play();
            if(hits==8) {
                clearInterval(clockId);
                showHits.innerHTML = `Aciertos: ${hits} 🤯`;
                showTime.innerHTML = `Genial! Ganaste en tan solo ${initialTimer - timer}s 🔥`
                showMoves.innerHTML = `Movimientos: ${moves} 🤘🏻🤘🏻`;
                winAudio.play();
            }
        } else {
            wrongAudio.play();
            setTimeout(() => {
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                showedCards = 0;
            }, 800);
        }
    }
}

function hideSection()
{
    let sections = document.getElementsByClassName("section");
    for(var i=0;i<sections.length;i++) {
        sections[i].classList.add("hide");
    }
    resetGame();
}

function changeSection(id)
{
  clickAudio.play();
  let section = document.getElementById(id);
  hideSection();
  section.classList.remove("hide");
}