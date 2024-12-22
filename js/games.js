import { displayData } from "./main.js";
let links = document.querySelectorAll(".nav-link");
let gamesRow = document.getElementById("gamesRow");

export let category;

//Games Class
export class Games {
  constructor(category) {
    this.category = category;
  }
  async getGames() {
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
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`,
        options
      );
      response = await response.json();
      return response;
    } catch (error) {
      displayGamesError();
    }
  }
}

// Get Games By Category
links.forEach((link) => {
  if (link.classList.contains("active") && link.hasAttribute("data-category")) {
    category = link.getAttribute("data-category");
  }
  link.addEventListener("click", async function () {
    gamesRow.innerHTML = `  <div class="spinner-container ">
                <span class="loader"></span>
              </div>`;
    links.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
    category = link.getAttribute("data-category");
    setTimeout(async () => {
      try {
        await displayData();
      } catch (error) {
        displayGamesError();
      }
    }, 500);
  });
});

// Function To Display Error Fetching Games
export function displayGamesError() {
  gamesRow.innerHTML = `
    <div class="error-container">
      <div class="error-icon"><i class="bi bi-exclamation-triangle-fill"></i></div>
      <h2 class="error-title">Oops! Something went wrong.</h2>
      <p class="error-message">We couldn't load the games. Please try again later.</p>
      <button class="retry-button" onclick="retryFetchGames()">Retry</button>
    </div>
  `;
}

// Function Retry Fetching Games
window.retryFetchGames = async function () {
  links.forEach((link) => link.classList.remove("active"));
  document
    .querySelector(`[data-category="${category}"]`)
    .classList.add("active");
  gamesRow.innerHTML = `<div class="spinner-container">
                          <span class="loader"></span>
                        </div>`;
  setTimeout(async () => {
    try {
      await displayData();
    } catch (error) {
      displayGamesError();
    }
  }, 500);
};
