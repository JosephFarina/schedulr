const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'server/views'))

// app.use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public'), {
  index: false,
}))

app.use(cookieParser())
app.use(compression())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE')
  next()
})

// DB
// models.sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection successful')
//   })
//   .catch((error) => {
//     console.log("Error creating connection:", error)
//   })

// models.sequelize.sync({ force: false })
//   .then(res => console.log('Sequelize Sync Succesfull'))
//   .catch(err => console.error('Sequelize Sync failed' + err))



// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err['status'] = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})





/**
 * 
 * BinWWW
 * 
 */





const http = require('http')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const p0rt = parseInt(val, 10)

  if (isNaN(p0rt)) {
    // named pipe
    return val
  }

  if (p0rt >= 0) {
    // port number
    return p0rt
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}
