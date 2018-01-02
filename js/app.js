// Store class for each card's i element in variable
const diamond = '<li class="card match"><i class="fa fa-diamond"></i></li>';
const diamond2 = '<li class="card match"><i class="fa fa-diamond"></i></li>';
const plane = '<li class="card match"><i class="fa fa-paper-plane"></i></li>';
const plane2 = '<li class="card match"><i class="fa fa-paper-plane"></i></li>';
const anchor = '<li class="card match"><i class="fa fa-anchor"></i></li>';
const anchor2 = '<li class="card match"><i class="fa fa-anchor"></i></li>';
const bolt = '<li class="card match"><i class="fa fa-bolt"></i></li>';
const bolt2 = '<li class="card match"><i class="fa fa-bolt"></i></li>';
const cube = '<li class="card match"><i class="fa fa-cube"></i></li>';
const cube2 = '<li class="card match"><i class="fa fa-cube"></i></li>';
const leaf = '<li class="card match"><i class="fa fa-leaf"></i></li>';
const leaf2 = '<li class="card match"><i class="fa fa-leaf"></i></li>';
const bicycle = '<li class="card match"><i class="fa fa-bicycle"></i></li>';
const bicycle2 = '<li class="card match"><i class="fa fa-bicycle"></i></li>';
const bomb = '<li class="card match"><i class="fa fa-bomb"></i></li>';
const bomb2 = '<li class="card match"><i class="fa fa-bomb"></i></li>';

// Create array to hold all card variables
const cardsList = [diamond, diamond2, plane, plane2, anchor, anchor2, bolt, bolt2, cube, cube2, leaf, leaf2, bicycle, bicycle2, bomb, bomb2]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
// Make variable to hold random array
const randomCardsList = shuffle(cardsList);

// Loop through cards list array
const deckList = document.querySelector('.deck');
for (const card of randomCardsList) {
  deckList.insertAdjacentHTML('beforeend', card);
}


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
