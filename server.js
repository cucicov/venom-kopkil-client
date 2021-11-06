var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var app = express()
var cors = require('cors')

app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(cors())

var port = process.env.PORT
app.listen(port, () => {
  console.log(port)
})
