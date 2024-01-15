const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Parse command line arguments using minimist module
const argv = minimist(process.argv.slice(2),{
  boolean: ['banner', 'nobanner'], // boolean flags
});

// Load and update configuration based on command line arguments
const config = loadConfig();
updateConfig(config, argv);

// Function to load configuration from 'config.json' file
function loadConfig() {
  // Set the file path for the configuration file
  const filePath = path.resolve(__dirname, 'config.json');

  try {
    // Read and parse the content of the configuration file
    return JSON.parse(fs.readFileSync(filePath, 'UTF-8'));    
  }catch(e) {
    console.error('Error reading or parsing config file');
    return {
      // Set default values for flags
      "banner": true,
      "nobanner": false,
      "help": true
    };
  }
}

// Function to update configuration based on command line flags
function updateConfig(config, flags) {

   // Iterate through flags and update corresponding keys in the config
   Object.keys(flags).forEach((flag) => {
     // Skip reserved flags like '_', 'version', etc.   
    if (flag !== '_' && flag !== 'version') {      
        config[flag] = flags[flag];      
    }    
  });

  return config;
}

// Function to save the updated configuration to 'config.json' file
function saveConfig(config){
  const filePath = path.resolve(__dirname, './config.json');

  try {   
    // Write the updated configuration to the file 
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error('Error writing config file:', e.message);
  }
}

module.exports = {
  loadConfig,
  updateConfig,
  saveConfig,
}

