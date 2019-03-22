const express = require('express')
const CryptoJS = require("crypto-js");

const app = express()
const port = 3000
const callback = "http://localhost:3000/"
const hashKey = "demoCHANGED"
var generatedhash = CryptoJS.HmacSHA1(datastring, hashKey).toString()

app.set('view engine', 'pug')

let data = {live:"0", oid: "112", ttl:"900", tel:"3456780987", eml:"martina.devlang@gmail.com", vid:"demo", curr:"KES", cbk: callback, hsh: generatedhash}

var datastring = [];

for(var key in data) {
    if (data.hasOwnProperty(key)) {
        datastring.push(data[key])
    }
}


datastring = datastring.join()
console.log(datastring)


app.get('/', (req, res) => res.send('Hello World!'))
app.get('/home', (req, res) => res.render('index', {title: "world", data}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))