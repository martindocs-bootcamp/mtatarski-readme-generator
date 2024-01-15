const addLeadingZeros = require('./leadingZero');

function generateID(){
  const date = new Date();
  const year = date.getFullYear();
  const month = addLeadingZeros(date.getMonth() + 1);
  const day = addLeadingZeros(date.getDate() + 1);
  const hour = addLeadingZeros(date.getHours());
  const minutes = addLeadingZeros(date.getMinutes());
  const seconds = addLeadingZeros(date.getSeconds());

  // Format YYYYMMDD-HHMMSS
  return `${year}${month}${day}-${hour}${minutes}${seconds}`;
}

module.exports = generateID;