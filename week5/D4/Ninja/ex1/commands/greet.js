import chalk from "chalk";

export function coloreMessage(message) {
  return chalk.bgGreen.black.italic.bold(message);
}
