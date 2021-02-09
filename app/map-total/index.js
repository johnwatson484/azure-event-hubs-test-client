const mapTotal = (total) => {
  if (!total) {
    return 0
  }
  if (total < 0) {
    return 0
  }
  return Number(total)
}

module.exports = mapTotal
