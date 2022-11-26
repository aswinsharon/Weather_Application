const request = require("request");
const constants = require(__dirname+"/config")

const weatherData = (address,callback)=>{

     const url = constants.openWeatherApi.URL+encodeURIComponent(address)+"&appid="+constants.openWeatherApi.KEY+constants.openWeatherApi.Unit;
     request({url,json:true},(error,response,body) =>{
     
          if(error){
               console.log(error)
          }else{

               callback(undefined,{

                    temperature:body.main.temp,
                    humidity:body.main.humidity,
                    city:body.name,
                    clouds:body.clouds.all,
                    wind:body.wind.speed,
                    timezone:body.timezone,
                    description:body.weather[0].description
               });
          }
     
     });
}

module.exports = weatherData;