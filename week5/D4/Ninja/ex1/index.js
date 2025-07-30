import { coloreMessage } from "./commands/greet.js";
import { getData } from "./commands/fetch.js";
import { readFile } from "./commands/read.js";
import { Command } from "commander";

const program = new Command();
program
  .command("greet")
  .description("Display a colored greeting message")
  .action(() => {
    console.log(coloreMessage("Hello, Ninja!"));
  });

program
  .command("fetch <url>")
  .description("Fetch data from a URL")
  .action(async (url) => {
    try {
      await getData(url);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  });
program.parse(process.argv);
