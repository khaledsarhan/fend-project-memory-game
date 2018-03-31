/*
 * Create a list that holds all of your cards
 */
let openedCards = [];
let matchedCards = 0;

let cardSymbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube",
    "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o",
    "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

cardSymbols = shuffle(cardSymbols);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function displayCards() {
    const frag = document.createDocumentFragment();

    const cardsContainer = document.querySelector(".deck");

    for (let i = 0; i < cardSymbols.length; i++) {
        let cardItem = document.createElement("li");
        cardItem.classList.add("card");
        cardItem.classList.add("close");

        let cardContent = document.createElement("li");
        cardContent.classList.add("fa");
        cardContent.classList.add(cardSymbols[i]);

        cardItem.appendChild(cardContent);
        frag.appendChild(cardItem);
    }

    cardsContainer.appendChild(frag);
}

// Shuffle function from http://stackoverflow.com/a/2450976
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

function checkSymbols() {
    if (openedCards.length === 2) {

        document.querySelector(".deck").removeEventListener('click', cardClick)
        setTimeout(function () {
            openedCards = [];
            document.querySelector(".deck").addEventListener('click', cardClick)
        }, 700);

        if (openedCards[0].firstChild.classList[1] === openedCards[1].firstChild.classList[1]) {
            setOpenedCardsClasses('card match');

            matchedCards++;
            if (matchedCards === cardSymbols.length / 2) {
                // Completed
            }

        } else {
            setOpenedCardsClasses('card mismatch');
            setTimeout(function () {
                setOpenedCardsClasses('card close')
            }, 500);
        }
    }
}

displayCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
document.querySelector(".deck").addEventListener('click', cardClick)

function cardClick(e) {
    if (e.target.classList.contains('card') && !e.target.classList.contains('match') && !e.target.classList.contains('open')) {
        showSymbol(e.target);
        checkSymbols();
    }
}