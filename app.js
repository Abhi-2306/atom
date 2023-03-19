const express = require( 'express');
const https = require('https');
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res){

  const query=req.body.CityName;
  const appkey="72e0c446d2567071993f40b277753a0e#";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=" +unit+ "&appid=" + appkey;
  https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    const weatherData=JSON.parse(data)
  //  console.log(weatherData);
    const temp=weatherData.main.temp;
    const icon="https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
    console.log(temp);
    res.write("<p>The weather curently is "+weatherData.weather[0].description+"</p>");
    res.write("<h1>The temperature in " + req.body.CityName + " is "+temp+" degrees Celcius</h1>");
    res.write("<img src="+icon+">");
    res.send();
  });
  })

});




app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
