function formatEvent (value) {
  return JSON.stringify(JSON.parse(value))
}

module.exports = formatEvent
