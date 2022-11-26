const express = require("express");
const https = require("https");
const hbs = require("hbs");
const path = require("path");
const mongoose = require("mongoose")
const { response } = require("express");
const app = express();

const weatherData = require(__dirname+"/weatherData");

const PORT = 3000;
const publicPath = __dirname+"/public";
const viewsPath =  __dirname+"/templates/views";
const partialPath = __dirname+"/template/partials";
const picturePath = __dirname+"/pictures/day";

app.use(express.urlencoded({extended:true}));
app.use(express.static(publicPath));

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialPath);

mongoose.connect("mongodb://127.0.0.1:27017/weatherDB");

const schema = {
    temperature:Number,
    humidity:Number,
    city:String,            //creating schema
    clouds:Number,
    wind:Number,
    time:Number,
    description:String
}
const Weather = mongoose.model("Weather",schema);

app.get("/",(req,res)=>{

    res.render('index',{

        title:"Weather app"
    });
})

app.get("/weather",(req,res)=>{
    
    const address = req.query.address;
    
    if(!address){

        return res.send({

            error:"Address field is empty"
        });
    }
    weatherData(address,(error,{temperature,humidity,city,clouds,wind,timezone,description})=>{
        
        if(error){
            
           return res.send({
                error
            });
         }
        res.send({
            temperature,
            humidity,
            city,
            clouds,
            wind,
            timezone,
            description,
        })
        var data = new Weather({
            temperature:temperature,
            humidity:humidity,
            city:city,
            clouds:clouds,               
            wind:wind,
            time:timezone,
            description:description
        })
        Weather.insertMany(data,function(err){
    
            if(err){
                console.log(err);                                  //inserting data to database
            }else{
                console.log("data has been inserted to db");
            }
        })
    })

});

app.get("*",(req,res)=>{

   res.render("404",{
      title:"page not found"
   })

});

app.listen(PORT, () =>{ 
    console.log(`Listening on port ${PORT}`)
});

