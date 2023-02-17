const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "7570b5992b9d008bc418f1a214286a2f"

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "%20&units=metric&appid=" + apiKey;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weather = JSON.parse(data);
      console.log(weather);

      const tempt = weather.main.temp
      const weatherdes = weather.weather[0].description
      const image = weather.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + image + "@2x.png";
      console.log(tempt);
      console.log(weatherdes);
      res.write("<h1>Temperature in " + query + " is " + tempt + " degress</h1>");
      res.write("The weather description is " + weatherdes);
      res.write("<br><img src=" + imgUrl + ">")
      res.send();
    })
  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
