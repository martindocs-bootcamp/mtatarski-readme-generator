function generateID(){
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).padStart(2, '0');
  const day = (date.getDate() + 1).padStart(2, '0');
  const hour = date.getHours().padStart(2, '0');
  const minutes = (date.getMinutes()).padStart(2, '0');
  const seconds = date.getSeconds().padStart(2, '0');

  // Format YYYYMMDD-HHMMSS
  return `${year}${month}${day}-${hour}${minutes}${seconds}`;
}

module.exports = generateID;