// Function to clear terminal screen
function clearConsole() {
  // ANSI escape code to clear the console
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

module.exports = clearConsole;
