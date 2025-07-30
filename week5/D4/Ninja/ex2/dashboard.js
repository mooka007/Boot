import { getWeather } from "./weather.js";
import readline from "readline";

export function askCityName() {
  console.log("Merci d'avoir utsilisé le tableau de bord météo !");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Entrez le nom d'une ville : ", async (cityName) => {
    await getWeather(cityName);
    rl.close();
  });
}
askCityName();
