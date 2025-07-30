import axios from "axios";
import chalk from "chalk";

export async function getWeather(nameCity) {
  try {
    const apiKey = "a0cadfb00ef6706ed83a4df86d8c42e3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${apiKey}&lang=fr`;
    const response = await axios.get(url);
    const data = response.data;
    console.log(chalk.blue(`\nMétéo de ${data.name} :`));
    console.log(
      chalk.green(`Température : ${(data.main.temp - 273.15).toFixed(2)}°C`)
    );
    console.log(chalk.yellow(`Humidité : ${data.main.humidity}%`));
    console.log(chalk.cyan(`Vent : ${data.wind.speed} m/s\n`));
  } catch (error) {
    console.error(
      chalk.red("Erreur lors de la récupération des données météo :"),
      error.message
    );
  }
}

// Pour tester la fonction, décommentez les lignes suivantes et exécutez le script
// getWeather("Paris");
// getWeather("Casablanca");
// getWeather("Salé");
