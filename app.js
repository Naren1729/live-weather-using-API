const express = require('express');
const app = express();
const https = require("https");

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));



app.get("/", function (req, res) {

 res.sendFile(__dirname+"/index.html")
    
});


app.post("/", function (req, res) {

    console.log("post received");



    const query = req.body.cityname;
    const apikey = "5d1c5524aaa0cfc437ba62f8747bf94d";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            var discription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const place = weatherData.name;
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>weather in " + place + "</h1>");
            res.write("<p>temperature is " + temp + " and description is " + discription + "<p>");
            res.write("<img src=" + imageurl + ">");

             res.send();
        })

       

    })

});





app.listen(3000, function () {
    console.log("server is running on port 3000!");
});