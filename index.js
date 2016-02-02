'use strict'
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const useragent = require('express-useragent')

app.set('port', (process.env.PORT || 5000))

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(useragent.express());

app.get('/', (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host')
    res.render('home', {url1: baseUrl + '/1450137600', url2: baseUrl + encodeURIComponent('/Dec 20, 2015')})
})

app.get('/api/whoami', (req, res) => {
    // Set response type header for JSON
    res.header("Content-Type", "application/json")
    console.log(req.acceptsLanguages)
    let responseBody = JSON.stringify({
        'ip': req.ip,
        'languages': req.acceptsLanguages(),
        'os': req.useragent.os
    })
    
    res.send(responseBody)
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
})