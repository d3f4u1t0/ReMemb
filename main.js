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

numbers = numbers.sort(() => {return Math.random()-0.5});
console.log(numbers);

function countTimer(){
    clockId = setInterval(() => {
        timer--;
        showTime.innerHTML = `Tiempo: ${timer} s`;
        if(timer == 0) {
            clearInterval(clockId);
            blockCards();
            showTime.innerHTML = `Tiempo: 0 s`;
            timer=false;
        }
    },1000);
}

function blockCards(){
    for (let i = 0; i<=15; i++) {
        let blockedCard = document.getElementById(i);
        blockedCard.innerHTML = `<img src="./images/${numbers[i]}.png" alt="">`;
        blockedCard.disabled = true;
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
        card1.innerHTML = `<img src="./images/${firstResult}.png" alt="">`;
        card1.disabled = true;
    }else if(showedCards == 2) {
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="./images/${secondResult}.png" alt="">`;;
        card2.disabled = true;
        moves++;
        showMoves.innerHTML = `Movimientos: ${moves}`;
        if(firstResult == secondResult) {
            showedCards = 0;
            hits++;
            showHits.innerHTML = `Aciertos: ${hits}`;
            if(hits==8) {
                clearInterval(clockId);
                showHits.innerHTML = `Aciertos: ${hits} 🤯`;
                showTime.innerHTML = `Genial! Ganaste en tan solo ${initialTimer - timer} s 🔥💪🏻🔥`
                showMoves.innerHTML = `Movimientos: ${moves} 🤘🏻🤘🏻`;
            }
        } else {
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