const formatEvent = (event, routingKey, id) => {
  event = replacePlaceholders(event, id)
  event = toJson(event)
  event = addHeaders(event, routingKey)
  return event
}

const replacePlaceholders = (event, id) => {
  return event.replace(/##/g, id)
}

const toJson = (event) => {
  return JSON.parse(event)
}

const addHeaders = (event, routingKey) => {
  if (routingKey) {
    event.headers = { routingKey }
  }
  return event
}

module.exports = formatEvent
