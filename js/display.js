import { GameDetails } from "./details.js";
let gamesRow = document.getElementById("gamesRow");
let detailsRow = document.getElementById("detailsRow");
let gamesContainer = document.querySelector(".games-container");
let gameDetails = document.querySelector(".game-details");

export function displayGames(arr) {
  var cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `<div class="col">
                  <div class="card bg-transparent h-100" onclick="displayDetails(${
                    arr[i].id
                  })">
                    <div class="card-body text-white">
                      <figure>
                        <img
                          src="${arr[i].thumbnail}"
                          class="card-img-top w-100"
                          alt="..."
                        />
                      </figure>
                      <div
                        class="card-title d-flex justify-content-between align-items-center mb-0"
                      >
                        <h3>${arr[i].title}</h3>
                        <span class="badge text-bg-primary p-2">Free</span>
                      </div>
                      <p class="card-text text-center small opacity-50">
                      ${arr[i].short_description
                        .split(" ")
                        .slice(0, 8)
                        .join(",")}
                      </p>
                    </div>
                    <div
                      class="card-footer d-flex justify-content-between align-items-center"
                    >
                      <span class="badge text-bg-dark">${arr[i].genre}</span>
                      <span class="badge text-bg-dark">${arr[i].platform}</span>
                    </div>
                  </div>
                </div>`;
  }
  gamesRow.innerHTML = cartoona;
}

window.displayDetails = async function (index) {
  let details = new GameDetails(index);
  details = await details.getDetails();
  gamesContainer.classList.add("d-none");
  gameDetails.classList.remove("d-none");
  var cartoona = `<div class="col-md-4">
            <img src="${details.thumbnail}" class="w-100" alt="" />
          </div>
          <div class="col-md-8 text-white">
            <h3>Title: ${details.title}</h3>
            <p>Category: <span class="badge text-bg-info">MMORPG</span></p>
            <p>Platform: <span class="badge text-bg-info"> ${details.platform}</span></p>
            <p>Status: <span class="badge text-bg-info">${details.status}</span></p>
            <p class="small">
            ${details.description}
            </p>
            <a href="${details.game_url}" target="_blank" class="btn btn-outline-warning text-white">Show Game</a>
          </div>`;
  detailsRow.innerHTML = cartoona;
};
