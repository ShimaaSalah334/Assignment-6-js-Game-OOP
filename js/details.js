let closeBtn = document.getElementById("closeBtn");
let gameDetails = document.querySelector(".game-details");
let gamesContainer = document.querySelector(".games-container");

export class GameDetails {
  constructor(id) {
    this.id = id;
  }
  async getDetails() {
    let response = await fetch(
       `https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/game?id=${this.id}`
    );
    response = await response.json();
    return response;
  }
}

closeBtn.addEventListener("click", function () {
  closeDetails();
});

function closeDetails() {
  gameDetails.classList.add("d-none");
  gamesContainer.classList.remove("d-none");
}
