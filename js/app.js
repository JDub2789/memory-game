// Easy timer by Albert Gonzalez - https://albert-gonzalez.github.io/easytimer.js/
var timer = new Timer();
gameStart = false;
timer.addEventListener('secondsUpdated', function (e) {
    $('#timer').html(timer.getTimeValues().toString());
});

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
  }
  shuffle(cardsListTimesTwo);
  // add for loop here, using i to add id to each card
  for (i = 0; i <= cardsListTimesTwo.length - 1; i++) {
    deckList.append(`<li id="card-${i}" class="card show animated"><i class="fa ${cardsListTimesTwo[i]}"></i></li>`);
  }
}
createCards();

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
  } else if (attemptCounter > 15){
    starsList.innerHTML = oneStar;
    modalStarsList.innerHTML = oneStar;
  }
}

let openCardsList = [];
// Function to display the card (when clicked)
function showCard(event, target) {
  if (gameStart === false) {
    gameStart = true;
    timer.start(); }
      if (openCardsList.length === 0) {
        (event.target).classList.toggle("flipInY");
        (event.target).classList.toggle("open");
        (event.target).classList.toggle("show");
        openCardsList.push(event.target);
        const openedCard = document.getElementsByClassName('open');
        for (i=0; i<1; i++) {
          openedCard[i].removeEventListener('click', showCard);
        }
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

// Function to determine if cards match
function matchingLogic() {
  if (openCardsList[0].firstChild.className === openCardsList[1].firstChild.className && openCardsList[0].id != openCardsList[1].id) {
    openCardsList[0].classList.add('match');
    openCardsList[1].classList.add('match');
    numberOfWins++;
    let matchedCards = document.getElementsByClassName('match');
    for (const matchedCard of matchedCards) {
      matchedCard.removeEventListener('click', showCard);
    }
    if (numberOfWins === 8) {
      youWon();
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
      openCardsList[0].addEventListener('click', showCard);
      openCardsList[1].addEventListener('click', showCard);
        for (i = 0; i < 2; i++) {
          openCardsList.pop();
        }
      }, 1500);
    }
}

// Event Listener to activate showCard function when card is clicked
var cardObjects = document.getElementsByClassName('card');
function makeDeckClickable() {
  for (const cardObject of cardObjects) {
  cardObject.addEventListener('click', showCard);
} }
makeDeckClickable();

// Creates modal object (not visible)
$(document).ready(function(){
  $('#winModal').modal();
});

// Function to display modal on win
function youWon() {
  $('#winModal').modal('open');
  // $('#timeToWin').append(`It took you ${totalSeconds} seconds to win.`);
  $('#timeToWin').html(timer.getTimeValues().seconds);
}

// Function to restart game
function restartGame() {
  numberOfWins = 0;
  attemptCounter = 0;
  gameStart = false;
  timer.stop();
  console.log(gameStart);
  $('#timer').html("00:00");
  scorePanel.textContent = attemptCounter;
  $('.card').remove();
  cardsListTimesTwo = [];
  createCards();
  makeDeckClickable();
}

// Function for restart button inside modal
function restartGameModal() {
  restartGame();
  $('#winModal').modal('close');
}

$('.restart').click(restartGame);
$('.restart-modal').click(restartGameModal);
