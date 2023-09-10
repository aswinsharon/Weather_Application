const {MongoClient} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3'
const client = new MongoClient(uri);


module.exports = class manageDatabase {

    async establishConnection() {
        try {
            await client.connect();
        } catch (e) {
            console.log("Error in connection with mongodb database");
        } 
    }

    async insertIntoDatabase(data) {

        const resultForInsertion = await client.db('weatherDB').collection('weathers').insertOne(data);
        
        console.log(`Created a weather data with id ${resultForInsertion.insertedId}`);
    }

    async findCityInDataBase(city) {

        const resultForFinding = await client.db('weatherDB').collection('weathers').findOne({
            city: city
        });

        if (resultForFinding) {
            console.log(`Found weather data for city with the name ${city}`);
        } else {
            console.log(`The city with the name ${city} doesnot exist`);
        }
    }

}