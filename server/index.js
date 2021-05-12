const mongoose = require('mongoose');
let url;

if (process.env.MONGODB_URL)
{
    url = process.env.MONGODB_URL;
} else {
    url = "mongodb://mongo:27017/users";
}

mongoose.Promise = global.Promise;
mongoose.connect(
    url,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        authSource: "admin"
    },
    function(err, db) {
        if(err)
        {
            console.log("Connection with database failed");
            console.log(err);
            return; // Exit
        }
        
        console.log("Connected successfully to database.");
    }
)

mongoose.set("debug", true);

module.exports = mongoose.connection;