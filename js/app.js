// Store class for each card's i element in variable
// const diamond = '<li class="card show"><i class="fa fa-diamond"></i></li>';
// const diamond2 = '<li class="card show"><i class="fa fa-diamond"></i></li>';
// const plane = '<li class="card"><i class="fa fa-paper-plane"></i></li>';
// const plane2 = '<li class="card"><i class="fa fa-paper-plane"></i></li>';
// const anchor = '<li class="card"><i class="fa fa-anchor"></i></li>';
// const anchor2 = '<li class="card"><i class="fa fa-anchor"></i></li>';
// const bolt = '<li class="card"><i class="fa fa-bolt"></i></li>';
// const bolt2 = '<li class="card"><i class="fa fa-bolt"></i></li>';
// const cube = '<li class="card"><i class="fa fa-cube"></i></li>';
// const cube2 = '<li class="card"><i class="fa fa-cube"></i></li>';
// const leaf = '<li class="card"><i class="fa fa-leaf"></i></li>';
// const leaf2 = '<li class="card"><i class="fa fa-leaf"></i></li>';
// const bicycle = '<li class="card"><i class="fa fa-bicycle"></i></li>';
// const bicycle2 = '<li class="card"><i class="fa fa-bicycle"></i></li>';
// const bomb = '<li class="card"><i class="fa fa-bomb"></i></li>';
// const bomb2 = '<li class="card"><i class="fa fa-bomb"></i></li>';

// Variable to hold cards' classes
var cardsList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

// Variable for number of matches (8 = win), starts at 0
let numberOfWins = 0;

// Function to create HTML for card, using ${card} variable
function createCardHTML(card) {
    $("#deck").append(`<li class="card animated show"><i class="fa ${card}"></i></li>`);
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

// Makes cards and appends each item to .deck <ul> and calls function
function createCards() {
    for (var i = 0; i < 2; i++) {
        cardsList = shuffle(cardsList);
        cardsList.forEach(createCardHTML);
    }
}
createCards();



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

let attemptCounter = '';
const scorePanel = document.querySelector('.moves');
const starsList = document.querySelector('.stars');
const scoreStars = '<li><i class="fa fa-star"></i></li>';

// Displays the card
function showCard(event, target) {
  addCardToOpenList(event.target);
  event.target.classList.toggle('open');
  event.target.classList.toggle('show');
}

// Increases stars and moves counter
// TODO - update stars counter from 3 to 2 to 1 based on time/moves
function scorePanelIncrease() {
  attemptCounter++;
  scorePanel.textContent = attemptCounter;
  // starsList.insertAdjacentHTML('beforeend', scoreStars);
}

// Adds the card to "open" list
let openCardsList = [];
function addCardToOpenList(openCard) {
  openCardsList.push(openCard);
    if(openCardsList.length > 1 && (openCardsList[0] === openCardsList[1])) {
      scorePanelIncrease();
      openCardsList[0].classList.add('match');
      openCardsList[1].classList.add('match');
      console.log('openCardsList');
      openCardsList.pop();
      openCardsList.pop();
      console.log('match popped:' + openCardsList);
      event.target.removeEventListener();
      numberOfWins++;
    } else if (openCardsList.length == 2) {
      console.log(openCardsList.length);
      scorePanelIncrease();
      for (i = 0; i != 3; i++) {  // this loop won't work with "i != 2" or "i <= 1"
        // openCardsList[i].classList.remove('open');
        openCardsList[i].classList.remove('show');
        openCardsList.pop();
      }
    }
}

// deckList.addEventListener('click', showCard);
