const formatEvent = (event, id) => {
  event = replacePlaceholders(event, id)
  return JSON.parse(event)
}

const replacePlaceholders = (event, id) => {
  return event.replace(/##/g, id)
}

module.exports = formatEvent
