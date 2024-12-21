import { get } from "./main.js";
let links = document.querySelectorAll(".nav-link");

export let category;
export class Games {
  constructor(category) {
    this.category = category;
  }
  async getGames() {
    const options = {
      method: "GET",
    };
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games?category=${this.category}`,
      options
    );
    response = await response.json();
    return response;
  }
}

links.forEach((link) => {
  if (link.classList.contains("active") && link.hasAttribute("data-category")) {
    category = link.getAttribute("data-category");
  }
  link.addEventListener("click", async function () {
    links.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
    category = link.getAttribute("data-category");
    console.log(category);
    await get();
  });
});
