// Variable for number of matches (8 = win), starts at 0
let numberOfWins = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Variable to hold cards' class names
var cardsList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

// Variable for <ul> that holds list of cards
const deckList = $(".deck");

// Function to create HTML for card, using ${card} variable to subsitute class name from cardsList array
function createCardHTML(card) {
    deckList.append(`<li class="card show"><i class="fa ${card}"></i></li>`);
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
// the .forEach pulls each item from cardsList array and passes that value to the createCardHTML function
let cardsListTimesTwo = [];
function createCards() {
  for (const card of cardsList) {
    cardsListTimesTwo.push(card);
    cardsListTimesTwo.push(card);
  }
  shuffle(cardsListTimesTwo);
  cardsListTimesTwo.forEach(createCardHTML);
}
createCards();

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

// Variable to hold number of turns
let attemptCounter = '';

// Variables for updating score panel
  // Variable for number of moves
const scorePanel = document.querySelector('.moves');
  // Variable for ranking (number of stars)
const starsList = document.querySelector('.stars');
  // Variable for one star
const scoreStars = '<li><i class="fa fa-star"></i></li>';

// Function to increase moves counter
// TODO - update stars counter from 3 to 2 to 1 based on time/moves
function scorePanelIncrease() {
  attemptCounter++;
  scorePanel.textContent = attemptCounter;
  // starsList.insertAdjacentHTML('beforeend', scoreStars);
}

let openCardsList = [];
// Function to display the card (when clicked)
function showCard(event, target) {
    // function below not working
      if (openCardsList.length === 0) {
        (event.target).classList.toggle("open");
        (event.target).classList.toggle("show");
        console.log(openCardsList);
        openCardsList.push(event.target);
        // turnOffClick();
        console.log(openCardsList);
      } else if (openCardsList.length === 1) {
        scorePanelIncrease();
        (event.target).classList.toggle("open");
        (event.target).classList.toggle("show");
        openCardsList.push(event.target);
        console.log(openCardsList);
        matchingLogic();
      }
}

function turnOffClick() {
  openCardsList.forEach(function(clickedCard) {
    clickedCard.removeEventListener('click', showCard);
  });
}

function matchingLogic() {
  if (openCardsList[0].firstChild.className === openCardsList[1].firstChild.className) {
    openCardsList[0].classList.add('match');
    openCardsList[1].classList.add('match');
      for (i = 0; i < 2; i++) {
        openCardsList.pop();
      }
  } else {
    openCardsList[0].classList.toggle('open');
    openCardsList[0].classList.toggle('show');
    openCardsList[1].classList.toggle('open');
    openCardsList[1].classList.toggle('show');
      for (i = 0; i < 2; i++) {
        openCardsList.pop();
      }
  }
}

// Event Listener to activate showCard function when card is clicked
// remove line below
// var deckList = document.querySelector('.deck');
deckList.click(showCard);

// Variable to hold list of open cards
// let openCardsList = [];
// function addCardToOpenList(clickedCard) {
//   if (openCardsList.length === 0) {
//     (clickedCard).toggleClass("open");
//     console.log(openCardsList);
//     openCardsList.push(clickedCard);
//     console.log(openCardsList);
//
//   }
// }





// NOT WORKING

// Adds the card to "open" list

// function addCardToOpenList(openCard) {
//   openCardsList.push($(this));
//     if(openCardsList.length > 1 && (openCardsList[0] === openCardsList[1])) {
//       scorePanelIncrease();
//       openCardsList[0].classList.add('match');
//       openCardsList[1].classList.add('match');
//       console.log('openCardsList');
//       openCardsList.pop();
//       openCardsList.pop();
//       console.log('match popped:' + openCardsList);
//       event.target.removeEventListener();
//       numberOfWins++;
//     } else if (openCardsList.length == 2) {
//       console.log(openCardsList.length);
//       scorePanelIncrease();
//       for (i = 0; i <= 2; i++) {  // this loop won't work with "i != 2" or "i <= 1"
//         openCardsList[i].classList.remove('open');
//         openCardsList[i].classList.remove('show');
//         openCardsList.pop();
//       }
//     }
// }
