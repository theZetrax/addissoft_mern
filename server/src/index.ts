import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT: number = 8081;

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
    err => {
        if (err) {
            console.log("Connection with database failed.");
            console.log(err);
            return;
        }
        
        console.log("Connected successfully to database");
    }
)

mongoose.set("debug", true);

app.get('/', (req, res) => res.send("welcome to api"));
app.listen(PORT, () => console.log(`[server] Server listening at http://localhost:${PORT}`));