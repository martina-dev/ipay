const express = require('express');
const CryptoJS = require("crypto-js");
var axios = require("axios");
var fs = require('fs');


const app = express()
const port = 3000
const callback = "http://localhost:3000/"
const hashKey = 'demoCHANGED'

app.set('view engine', 'pug')

let data = {live:"0", oid: "374", ttl:"910", tel:"34598680987", eml:"martina.devlang@gmail.com", vid:"demo", curr:"KES", cbk: callback, crl:"0"}

var datastring = [];

for(var key in data) {
    if (data.hasOwnProperty(key)) {
        datastring.push(data[key])
    }
}

datastring = datastring.join('')
console.log(datastring)

var generatedhash = CryptoJS.HmacSHA1(datastring, hashKey).toString()


app.get('/', async(req, res) => {
    console.log(req.query)
    fs.appendFile('response.log', JSON.stringify(req.query), function(err) {
        if (err) throw err;
    })

    //VerifyPayment Function takes in the Vendor url, and parameter values as a data object
    verifyPayment = async function(data) { 
        var err;  
        axios.post("https://www.ipayafrica.com/ipn/?vendor=", data)
            .then((response, data) => {
                data = response
                //Check the status code to confirm whether the request was successful
                console.log("Status Code: ",data.status)
                if (data.status == 200){
                    //Send success message to user if successful
                    res.send("Hello There SUCCESS is upon Us")
                    console.log("It worked")
                } else {
                    res.send("Hello There There was a whoopsie")   
                }
            })
            .then((error, err) => {
                err = error
            })
    }

    verifyPayment({"id": req.query.id, "ivm": req.query.ivm,"qwh": req.query.qwh,"afd": req.query.afd,"poi": req.query.poi,"uyt": req.query.uyt,"ifd": req.query.ifd})
    
})
app.get('/home', (req, res) => res.render('index', {title: "IPAY AFRICA", data, generatedhash}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))