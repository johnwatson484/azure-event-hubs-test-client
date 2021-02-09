const formatEvent = (event, id) => {
  event = replacePlaceholders(event, id)
}

const replacePlaceholders = (event, id) => {
  return event.replace(/##/g, id)
}

module.exports = formatEvent
