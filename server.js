var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var app = express()
import AxiosPlugin from 'vue-axios-cors';

app.use(AxiosPlugin)
app.use(serveStatic(path.join(__dirname, 'dist')))
var port = process.env.PORT
app.listen(port, () => {
  console.log(port)
})
