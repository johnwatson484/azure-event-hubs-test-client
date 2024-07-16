const { check } = require('express-validator')

const validateHost = [
  check('host').isLength({ min: 1 })
    .withMessage('Invalid host')
    .trim(),
]

const validatePort = [
  check('topic').isLength({ min: 1 })
    .withMessage('Invalid port')
    .trim(),
]

const validateTopic = [
  check('topic').isLength({ min: 1 })
    .withMessage('Invalid Event Hub')
    .trim(),
]

const validateEvent = [
  check('event')
    .isJSON()
    .withMessage('Invalid JSON message')
    .trim(),
]

const validateSend = [].concat(validateHost, validatePort, validateTopic, validateEvent)
const validateReceive = [].concat(validateHost, validatePort, validateTopic)

module.exports = {
  validateSend,
  validateReceive,
}
