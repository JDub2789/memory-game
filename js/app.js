// TODO:
// star counter based on moves
// add reset button to clear board
// add reset button to "win" modal
// disable clicking on already-matched cards
// remove modal button at bottom

var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
   ++totalSeconds;
   var minute = Math.floor(totalSeconds/60);
   var seconds = totalSeconds - minute*60;

   document.getElementById("timer").innerHTML = minute + ":" + seconds;
}

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
    deckList.append(`<li class="card show animated"><i class="fa ${card}"></i></li>`);
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
let attemptCounter = 0;

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
        (event.target).classList.toggle("flipInY");
        (event.target).classList.toggle("open");
        (event.target).classList.toggle("show");
        openCardsList.push(event.target);
        // turnOffClick();
      } else if (openCardsList.length === 1) {
        scorePanelIncrease();
        (event.target).classList.toggle("show");
        (event.target).classList.toggle("open");
        (event.target).classList.toggle("flipInY");
        openCardsList.push(event.target);
        matchingLogic();
      }
}




// Disables click (will call on already-matched cards)
function turnOffClick() {
  openCardsList.forEach(function(clickedCard) {
    clickedCard.removeEventListener('click', showCard);
  });
}

// Function to determine if cards match
function matchingLogic() {
  if (openCardsList[0].firstChild.className === openCardsList[1].firstChild.className) {
    openCardsList[0].classList.add('match');
    openCardsList[1].classList.add('match');
    numberOfWins++;
    console.log(numberOfWins);
    if (numberOfWins === 8) {
      youWon();
      clearInterval(timerVar);
    }
      for (i = 0; i < 2; i++) {
        openCardsList.pop();
      }
  } else {
    // setTimeout delays the flip so users can see wrong match
    setTimeout( function wrongMatch() {
      openCardsList[0].classList.toggle('open');
      openCardsList[0].classList.toggle('show');
      openCardsList[1].classList.toggle('open');
      openCardsList[1].classList.toggle('show');
        for (i = 0; i < 2; i++) {
          openCardsList.pop();
        }
      }, 1500);
    }
}

// Event Listener to activate showCard function when card is clicked
deckList.click(showCard);

$(document).ready(function(){
  $('#winModal').modal();
});

// Function to display modal on win
function youWon() {
  $('#winModal').modal('open');
  $('#timeToWin').append(`It took you ${totalSeconds} seconds to win.`);
}

// Restart timer
function restartGame() {
  totalSeconds = 0;
  numberOfWins = 0;
  attemptCounter = 0;
  scorePanel.textContent = attemptCounter;
  $('.card').remove();
  createCards();
}

// Restart timer and close modal
function restartGameModal() {
  restartGame();
  $('#winModal').modal('close');
}

$('.restart').click(restartGame);
$('.restart-modal').click(restartGameModal);
