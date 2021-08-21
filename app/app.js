const express = require('express')
const app = express()
const router = express.Router()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const cookieSession = require('cookie-session')
const { validationResult } = require('express-validator')
const { EventSender } = require('./events')
const formatEvent = require('./format-event')
const mapTotal = require('./map-total')
const { validateSend } = require('./validation')
const config = require('./config')

nunjucks.configure('./app/views', {
  autoescape: true,
  express: app
})

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession(config.cookie))

app.use(favicon('./app/favicon.ico'))

router.get('/', function (req, res) {
  const { session: { body } } = req
  res.render('index.njk', { body })
})

router.post('/send', validateSend, async function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send(errors.array().map(x => `<p>${x.msg}</p>`))
  }

  req.session.body = req.body

  let response

  try {
    const eventConfig = {
      host: req.body.host,
      port: req.body.port,
      connectionString: req.body.connectionString,
      username: req.body.username,
      password: req.body.password,
      authentication: req.body.authentication,
      topic: req.body.topic
    }
    const total = mapTotal(req.body.totalSend)
    const sender = new EventSender(eventConfig)
    await sender.connect()
    const events = []
    for (let i = 0; i < total; i++) {
      const event = formatEvent(req.body.event, req.body.routingKey, i + 1)
      events.push(event)
    }
    await sender.sendEvents(events, req.body.type)
    await sender.closeConnection()
    response = `Sent ${total} events`
    console.log(response)
  } catch (err) {
    response = `Unable to send event: ${err}`
    console.error(response)
  }
  res.send(response)
})

app.use('/', router)

module.exports = app
