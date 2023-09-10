const express = require("express");
// const https = require("https");
const hbs = require("hbs"); 
const path = require("path");
const manageDatabase = require('./manageDatabase');
const { response } = require("express");

const app = express();
const Database = new manageDatabase();
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

app.get("/",async (req,res)=>{

    res.render('index',{

        title:"Weather app"
    });
})

app.get("/weather", (req,res)=>{
    
    const address = req.query.address;
    
    if(!address){

        return res.send({

            error:"Address field is empty"
        });
    }
  weatherData(address, async (error,{temperature,humidity,city,clouds,wind,timezone,description})=>{
    
       await Database.establishConnection();
       try{
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
        var data = {
            'temperature':temperature,
            'humidity':humidity,
            'city':city,
            'clouds':clouds,               
            'wind':wind,
            'time':timezone,
            'description':description
        }
       
        await Database.insertIntoDatabase(data);

    } catch(error){
        console.log(error);
    }

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

module.exports = app;