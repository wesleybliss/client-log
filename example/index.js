'use strict'

const fs = require('fs')
const path = require('path')
const { shellOpen } = require('./shell-open')
const app = require('./app')

let browserIsOpened = false

app.post('/logs', (req, res) => {
    console.log(req.body)
    res.send(200)
})

app.post('/errors', (req, res) => {
    console.error(req.body)
    res.send(200)
})

app.get(/.*/, (req, res) => {
    
    let uri = ''
    
    if (Array('', '/').includes(req.url)) {
        uri = 'test.html'
    }
    else if (req.url.startsWith('/src')) {
        uri = '../src' + req.url.substring('/src'.length)
    }
    else {
        uri = req.url.substring(1)
    }
    
    console.log('"' + req.url + '"')
    console.log('"' + uri + '"')
    
    uri = path.resolve(__dirname, uri)
    
    console.log('"' + uri + '"')
    
    fs.readFile(uri, 'utf8', (err, file) => {
        if (err) return res.send(500, err)
        res.header('Content-type', 'text/html')
        res.status(200)
        res.end(file)
    })
    
})

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080
const address = `http://${host}:${port}`

if (!browserIsOpened) {
    browserIsOpened = true
    shellOpen(address)
}

app.listen(port, host, console.info(
    `${app.name} listening at ${address}`))
