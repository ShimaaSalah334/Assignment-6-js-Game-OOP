import { UI } from "./display.js";

let closeBtn = document.getElementById("closeBtn");
let gameDetails = document.querySelector(".game-details");
let gamesContainer = document.querySelector(".games-container");
let detailsRow = document.getElementById("detailsRow");

// Details Class
export class GameDetails {
  constructor(id) {
    this.id = id;
  }
  async getDetails() {
    try {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d915bb8e7amshb0d82fe79bbf25bp168084jsn30710f8fb834",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
      let response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`,
        options
      );
      response = await response.json();
      return response;
    } catch (error) {
      displayDetailsError(this.id);
    }
  }
}

// Function To Close Details
closeBtn.addEventListener("click", function () {
  closeDetails();
});
function closeDetails() {
  gameDetails.classList.add("d-none");
  gamesContainer.classList.remove("d-none");
}

// Function To Display Error Fetching Details
export function displayDetailsError(index) {
  detailsRow.innerHTML = `
    <div class="error-container text-center">
      <div class="error-icon"><i class="bi bi-exclamation-triangle-fill text-danger"></i></div>
      <h2 class="error-title">Failed to Load Game Details</h2>
      <p class="error-message">We couldn't fetch the game details. Please try again.</p>
      <button class="retry-button btn btn-primary mt-3" onclick="retryFetchDetails(${index})">Retry</button>
    </div>`;
}

// Function Retry Fetching Details
window.retryFetchDetails = function (index) {
  detailsRow.innerHTML = `
    <div class="spinner-container">
      <span class="loader"></span>
    </div>`;

  setTimeout(() => {
    const uiInstance = new UI();
    uiInstance.displayDetails(index);
  }, 500);
};
