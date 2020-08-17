const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const { check, validationResult } = require('express-validator')
const { sendEvent, formatEvent } = require('./sender')

nunjucks.configure('./app/views', {
  autoescape: true,
  express: app
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(favicon('./app/favicon.ico'))

router.get('/', function (req, res) {
  res.render('index.njk')
})

router.post('/', [
  check('connectionString')
    .contains('Endpoint=sb://')
    .withMessage('Connection string Endpoint missing')
    .contains(';SharedAccessKeyName=')
    .withMessage('Connection string SharedAccessKeyName missing')
    .contains(';SharedAccessKey=')
    .withMessage('Connection string SharedAccessKey missing')
    .trim(),
  check('topic').isLength({ min: 1 })
    .withMessage('Invalid queue')
    .trim(),
  check('value')
    .isJSON()
    .withMessage('Invalid JSON message')
    .trim()
], function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send(errors.array().map(x => `<p>${x.msg}</p>`))
  }

  const eventValue = formatEvent(req.body.value)

  sendEvent(
    req.body.connectionString,
    req.body.topic,
    eventValue
  )
  res.send('Event sent')
})

app.use('/', router)

module.exports = app
