const config = require('./config')

const http = require('http')
const app = require('./app')

app.set('port', config.port)

const server = http.createServer(app)
server.listen(config.port)
console.log(`server listening on port ${config.port}`)
