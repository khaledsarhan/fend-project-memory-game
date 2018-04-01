let openedCards = [];
let matchedCards = 0;
const moves = document.querySelector('.moves');
let movesCount = 0;
let starsRate = 3;
let gameStarted = false;
let seconds = 0, minutes = 0, hours = 0;
const timeEl = document.querySelector('.time');

/*
 * A list that holds all of your cards.
 */
let cardSymbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube",
    "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o",
    "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

displayNewCards();
resetResults();

/*
 * Shuffle the cards and creat the game board.
*/

function displayNewCards() {

    cardSymbols = shuffle(cardSymbols);

    let entireContainer = document.querySelector('.container');

    const cardsContainer = document.createElement("ul");
    cardsContainer.classList.add('deck');

    for (let i = 0; i < cardSymbols.length; i++) {
        let cardItem = document.createElement("li");
        cardItem.classList.add("card");
        cardItem.classList.add("close");

        let cardContent = document.createElement("li");
        cardContent.classList.add("fa");
        cardContent.classList.add(cardSymbols[i]);

        cardItem.appendChild(cardContent);
        cardsContainer.appendChild(cardItem);
    }

    entireContainer.appendChild(cardsContainer);
    document.querySelector(".deck").addEventListener('click', cardClick)
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function showSymbol(openedCard) {
    openedCard.setAttribute('class', 'card open');
    openedCards.push(openedCard);
}

function setOpenedCardsClasses(classes) {
    openedCards.forEach(function (card) {
        card.setAttribute('class', classes);
    });
}


// Apply the changes to the game board (Moves, Rate, Cards) while comparing the cards
function checkSymbols() {
    if (openedCards.length === 2) {

        let starsItems = document.querySelectorAll(".stars .fa");
        moves.textContent = ++movesCount + ' Moves';

        // Set the rate based on the moves count.
        switch (movesCount) {
            case 6:
                starsItems[2].setAttribute('class', 'fa fa-star-o');
                starsRate--;
                break;
            case 12:
                starsItems[1].setAttribute('class', 'fa fa-star-o');
                starsRate--;
                break;
            case 18:
                starsItems[0].setAttribute('class', 'fa fa-star-o');
                starsRate--;
                break;
        }

        // prevent other cards to be clickable
        document.querySelector(".deck").removeEventListener('click', cardClick)
        setTimeout(function () {
            openedCards = [];
            document.querySelector(".deck").addEventListener('click', cardClick)
        }, 700);

        // Compare the symbols and apply the result
        if (openedCards[0].firstChild.classList[1] === openedCards[1].firstChild.classList[1]) {
            setOpenedCardsClasses('card match');

            matchedCards++;
            if (matchedCards === cardSymbols.length / 2) {
                document.querySelector(".result").classList.toggle('show');
                document.querySelector(".rate-result").textContent = starsRate;
                document.querySelector(".time-result").textContent = timeEl.textContent;
                document.querySelector(".moves-result").textContent = movesCount;
                gameStarted = false;
            }

        } else {
            setOpenedCardsClasses('card mismatch');
            setTimeout(function () {
                setOpenedCardsClasses('card close')
            }, 500);
        }
    }
}

function cardClick(e) {
    if (e.target.classList.contains('card') && !e.target.classList.contains('match') && !e.target.classList.contains('open')) {
        gameStarted = true;
        showSymbol(e.target);
        checkSymbols();
    }
}

// Timer
function addTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
}

setInterval(function () {
    if (gameStarted) {
        addTime()
        timeEl.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }
}, 1000);

document.querySelector('.restart').addEventListener('click', function () {
    resetResults();
    document.querySelector(".deck").remove();
    displayNewCards();

    Array.from(document.querySelectorAll(".stars .fa")).forEach(function (c) {
        c.setAttribute('class', 'fa fa-star');
    });

});

function resetResults() {
    gameStarted = false;
    seconds = 0, minutes = 0, hours = 0;
    movesCount = 0;
    timeEl.textContent = '00:00:00'
    moves.textContent = '0 Moves';
    starsRate = 3;
    openedCards = [];
}
