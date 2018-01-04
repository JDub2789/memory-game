// TODO:
// disable clicking on already-matched cards
// diable clicking on non-<li> elements
// remove "show" from class list on initial deck build
// add eventListenter to each card (rather than the ul)
// make timer start on game start, rather than page load
// check responsiveness

// Timer
// from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript, submitted by Yusuf
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
  } console.log(cardsListTimesTwo);
  shuffle(cardsListTimesTwo);
  console.log(cardsListTimesTwo);
  // add for loop here, using i to add id to each card
  for (i = 0; i <= cardsListTimesTwo.length - 1; i++) {
    deckList.append(`<li id="card-${i}" class="card show animated"><i class="fa ${cardsListTimesTwo[i]}"></i></li>`);
  }
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
const modalStarsList = document.querySelector('.modalStars');
// Variables for stars
const threeStars = '<li><i class="fa fa-star"><i class="fa fa-star"><i class="fa fa-star"></i></li>';
const twoStars = '<li><i class="fa fa-star"><i class="fa fa-star"></i></li>';
const oneStar = '<li><i class="fa fa-star"></i></li>';

// Function to increase moves counter
function scorePanelIncrease() {
  attemptCounter++;
  scorePanel.textContent = attemptCounter;
}

// Function for stars score
function decreaseScore() {
  if (attemptCounter <= 8) {
    starsList.innerHTML = threeStars;
    modalStarsList.innerHTML = threeStars;
  } else if (attemptCounter > 8 && attemptCounter < 15 ) {
    starsList.innerHTML = twoStars;
    modalStarsList.innerHTML = twoStars;
  } else if (attemptCounter > 0){
    starsList.innerHTML = oneStar;
    modalStarsList.innerHTML = oneStar;
  }
}


let openCardsList = [];
// Function to display the card (when clicked)
function showCard(event, target) {
      if (openCardsList.length === 0) {
        (event.target).classList.toggle("flipInY");
        (event.target).classList.toggle("open");
        (event.target).classList.toggle("show");
        openCardsList.push(event.target);

        // Trying to disable click
        // (event.target).off('click');
        // const clickedCardId = "\'#" + event.target.id + "\'";
        // const clickedCardId = "\'" + event.target.id + "\'";
        // const clickedCardId = event.target.id;
        // console.log(clickedCardId);
        // document.getElementById(clickedCardId).removeEventListener('click', showCard());
      } else if (openCardsList.length === 1) {
        scorePanelIncrease();
        decreaseScore();
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
    clickedCard.click('off');
  });
}

// Function to determine if cards match
function matchingLogic() {
  if (openCardsList[0].firstChild.className === openCardsList[1].firstChild.className && openCardsList[0].id != openCardsList[1].id) {
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
  cardsListTimesTwo = [];
  createCards();
}

// Restart timer and close modal
function restartGameModal() {
  restartGame();
  timerVar = setInterval(countTimer, 1000);
  $('#winModal').modal('close');
}

$('.restart').click(restartGame);
$('.restart-modal').click(restartGameModal);
