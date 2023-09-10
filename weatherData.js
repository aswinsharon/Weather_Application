const request = require("request");
const constants = require(__dirname + "/config")

const weatherData = (address, callback) => {

     const url = constants.openWeatherApi.URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherApi.KEY + constants.openWeatherApi.Unit;

     request({url,json: true}, async (error, response, body) => {
        try{
          if (error) {
               console.log(error)
          } else {

              await callback(undefined, {

                    temperature: body.main.temp,
                    humidity: body.main.humidity,
                    city: body.name,
                    clouds: body.clouds.all,
                    wind: body.wind.speed,
                    timezone: body.timezone,
                    description: body.weather[0].description
               });
          }
     }catch(error){
          console.log('some thing went... wrong please try again...')
     }

     });
}


module.exports = weatherData;