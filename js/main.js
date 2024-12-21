import { Games , category } from "./games.js";
import { GameDetails } from "./details.js";
import { displayGames } from "./display.js";

export async function get() {

  let games = new Games(category);
  games = await games.getGames();

  console.log(games);
  displayGames(games);
}
get();
