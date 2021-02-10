const { Kafka, logLevel } = require('kafkajs')

class EventBase {
  constructor (config) {
    this.config = config
    this.topic = config.topic
    this.port = this.getPort(config.port)
  }

  async connect () {
    const credentials = this.getCredentials()
    this.kafka = new Kafka({
      logLevel: logLevel.ERROR,
      brokers: [`${this.config.host}:${this.port}`],
      clientId: 'azure-event-hubs-test-client',
      retry: {
        initialRetryTime: 100,
        retries: 0
      },
      ...credentials
    })
  }

  getPort (port) {
    return this.config.authentication === 'connectionString' ? 9093 : port
  }

  getCredentials () {
    switch (this.config.authentication) {
      case 'password':
        return this.getPasswordCredentials()
      case 'connectionString':
        return this.getConnectionStringCredentials()
      default:
        return {}
    }
  }

  getPasswordCredentials () {
    return {
      sasl: {
        mechanism: this.config.mechanism || 'plain',
        username: this.config.username,
        password: this.config.password
      }
    }
  }

  getConnectionStringCredentials () {
    return {
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: '$ConnectionString',
        password: this.config.connectionString
      }
    }
  }
}

module.exports = EventBase
