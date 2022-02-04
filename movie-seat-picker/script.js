const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

// Save index and price of a movie
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}
// Update total and count
function updateSelectedCount() {
  // Node list of selected seats
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // Copy selectedSeats into an array
  // Map through array take the index of the seat
  // Add it to localstorage
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length; // length works on node since it's an array
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
// Get data from localstorage and update UI

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  // Check if localStorage not empty and we have selected seats
  // if so we add the class selected and it shows after page reload
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  // Show the movie we lastly picked after reload in our UI
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Event listeners

// Movie select
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  // selected index a long returns index of the selected option
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
// Seat click
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Init count and total
updateSelectedCount();
