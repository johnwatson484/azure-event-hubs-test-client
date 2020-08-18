const Kafka = require('node-rdkafka')

function sendEvent (connectionString, topic, value) {
  console.log(`preparing to send ${value} to ${topic} topic`)

  const host = getHostFromConnectionString(connectionString)

  const producer = new Kafka.Producer({
    debug: 'all',
    'metadata.broker.list': `${host}:9093`,
    dr_cb: true,
    'security.protocol': 'SASL_SSL',
    'sasl.mechanisms': 'PLAIN',
    'sasl.username': '$ConnectionString',
    'sasl.password': connectionString
  })

  producer.connect()

  producer.on('ready', function () {
    try {
      producer.produce(topic, null, Buffer.from(value), null)
      console.log('event sent')
    } catch (err) {
      console.error(err)
    }
  })

  producer.on('event.error', function (err) {
    console.error('Error from producer')
    console.error(err)
  })

  producer.on('delivery-report', function (err, report) {
    if (err) console.error(err)
    console.log(`delivery-report: ${JSON.stringify(report)}`)
    producer.disconnect()
  })

  producer.setPollInterval(100)
}

function getHostFromConnectionString (connectionString) {
  const hostFlag = 'Endpoint=sb://'
  const hostFlagLocation = connectionString.indexOf(hostFlag)
  const sharedAccessKeyNameFlag = ';SharedAccessKeyName='
  const sharedAccessKeyNameFlagLocation = connectionString.indexOf(sharedAccessKeyNameFlag)
  return connectionString.substring(hostFlagLocation + hostFlag.length, sharedAccessKeyNameFlagLocation).replace('/', '')
}

module.exports = sendEvent
