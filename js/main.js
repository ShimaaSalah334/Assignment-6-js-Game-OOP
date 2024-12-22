import { Games, category } from "./games.js";
import { UI } from "./display.js";

export async function displayData() {
  const gamesInstance = new Games(category);
  const games = await gamesInstance.getGames();
  const uiInstance = new UI();
  uiInstance.displayGames(games);
}
displayData();
