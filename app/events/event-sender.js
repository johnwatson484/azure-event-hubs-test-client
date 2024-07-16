const EventBase = require('./event-base')
const { CompressionTypes } = require('kafkajs')

class EventSender extends EventBase {
  constructor (config) {
    super(config)
    this.sendEvents = this.sendEvents.bind(this)
  }

  async connect () {
    await super.connect()
    this.producer = this.kafka.producer()
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
      compression: CompressionTypes.None,
      messages: events,
    })
  }

  async closeConnection () {
    await this.producer.disconnect()
  }

  async transformEvent (event, type) {
    const headers = event.headers
    event = this.formatEvent(event, type)
    event = this.serializeEvent(event, headers)
    return event
  }

  formatEvent (event, type) {
    return {
      type,
      body: event,
    }
  }

  serializeEvent (event, headers = {}) {
    return {
      headers,
      value: JSON.stringify(event),
    }
  }
}

module.exports = EventSender
