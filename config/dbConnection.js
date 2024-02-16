const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/"
const connectDb = async()=>{
    try {
       const connect = await mongoose.connect(connectionString);
        console.log(
            connect.connection.host,
            connect.connection.name
        );
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDb;