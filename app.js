const express = require("express")
const https = require("https");
const bodyParser = require("body-parser");


const app = express()
const port = 3000

const ejs = require("ejs");
const { response } = require("express");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public")) 


app.get('/', (req, res) => {

  const apiUrl = "https://api.adviceslip.com/advice"

  https.get(apiUrl, function(response){
    response.on("data", function (data) {
        const adviceData = JSON.parse(data);
        const adviceID = adviceData.slip.id
        const adviceQuote = adviceData.slip.advice

        res.render('index', {adviceID: adviceID, adviceQuote: adviceQuote})
    })
  })
})

app.get('/about', (req, res) => {
    res.send('Hello About Page!')
    
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})