
var fetchData = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

let weatherIcon = document.querySelector(".weatherIcon i");
let temperature = document.querySelector(".temp");
let clouds = document.querySelector(".cloud");
let humidity = document.querySelector(".Humidity");
let wind = document.querySelector(".wind");
let city = document.querySelector(".name");
let description = document.querySelector(".description");
let timezone = document.querySelector(".date");
var tempData,windData,cloudData,cityData,humidity_data,timeData,descriptionData;
// const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
// date.textContent = new Date().getDate()+", "+months[new Date().getMonth()];


function cityDateTime(timezone){

    d = new Date();
    localTime = d.getTime();
    localOffset = d.getTimezoneOffset() * 60000;
    utc = localTime + localOffset;
    var cityDateTime = utc + (1000 * timezone);
    nd = new Date(cityDateTime)
    
    return nd;
}

weatherForm.addEventListener("submit",(event)=>{

    event.preventDefault();
    temperature.textContent = "";
    clouds.textContent = "";
    humidity.textContent = "";
    wind.textContent = "";
    city.textContent = "";
    description.textContent="";

    const LocationApi = fetchData+"?address="+search.value;

    fetch(LocationApi).then(response =>{

        response.json().then(data =>{
            
            if(data.error){

               temperature = data.error;
               clouds = "";
               humidity = "";
               wind = "";
               city = data.error;
               timezone = "";
               description = "";
            }else{
                 tempData = Math.ceil(data.temperature)+String.fromCharCode(176);
                 cityData =  data.city;
                 cloudData = data.clouds+"%";
                 humidity_data = data.humidity+"%";
                 windData = data.wind+"km/hr";
                 timeData = cityDateTime(data.timezone);
                 descriptionData = data.description

                temperature.textContent= tempData;
                city.textContent = cityData
                clouds.textContent = cloudData;
                humidity.textContent = humidity_data
                wind.textContent = windData
                timezone.textContent = timeData
                description.textContent = descriptionData ;         
            }
        })
    })
})
