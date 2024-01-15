function addLeadingZeros(value) {
  return String(value).padStart(2, '0');
}

module.exports = addLeadingZeros;