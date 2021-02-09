const EventBase = require('./event-base')
const { CompressionTypes } = require('kafkajs')

class EventSender extends EventBase {
  constructor (config) {
    super(config)
    this.sendEvents = this.sendEvents.bind(this)
    this.producer = this.kafka.producer()
  }

  async connect () {
    await super.connect()
    await this.producer.connect()
  }

  async sendEvents (events, type) {
    events = await Promise.all(events.map(x => this.transformEvent(x, type)))
    await this.send(events)
    return events
  }

  async send (events) {
    await this.producer.send({
      topic: this.topic,
      compression: CompressionTypes.GZIP,
      messages: events
    })
  }

  async closeConnection () {
    await this.producer.disconnect()
  }

  async transformEvent (event, type) {
    event = this.formatEvent(event, type)
    event = this.serializeEvent(event)
    return event
  }

  formatEvent (body, type) {
    return {
      type,
      body
    }
  }

  serializeEvent (event) {
    return {
      value: JSON.stringify(event)
    }
  }
}

module.exports = EventSender
