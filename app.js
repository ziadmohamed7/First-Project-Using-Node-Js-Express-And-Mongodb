const express  = require("express");
// const errorHandel = require('./midellware/contactMidellware.js');
const connectDb = require("./config/dbConnection.js");
const app = express();

const port =  3000;

app.use(express.json());
app.use('/api/contacts',require('./routs/contactsRouts.js'));
// new route for auth (register , login , current)
app.use('/api/users',require('./routs/userRouts.js'));



app.listen(port,()=>{
    console.log("server is connected on port ",port);
});

connectDb();