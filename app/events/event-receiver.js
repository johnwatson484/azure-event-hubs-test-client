const EventBase = require('./event-base')

class EventReceiver extends EventBase {
  constructor (config, action) {
    super(config)
    this.receiverHandler = this.receiverHandler.bind(this)
    this.action = action
    this.consumer = this.kafka.consumer({ groupId: 'azure-event-hubs-test-client' })
  }

  async connect () {
    await super.connect()
    await this.consumer.connect()
  }

  async subscribe () {
    await this.consumer.subscribe({
      topic: this.config.topic,
      fromBeginning: true
    })
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          await this.receiverHandler(message)
        } catch (err) {
          this.receiverError(err)
        }
      }
    })
  }

  receiverError (err) {
    console.error(err)
    throw err
  }

  async receiverHandler (event) {
    await this.action(event)
  }

  async closeConnection () {
    await this.consumer.disconnect()
  }
}

module.exports = EventReceiver
