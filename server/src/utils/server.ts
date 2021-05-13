import express, { Express } from 'express';
import mongoose from 'mongoose';

export async function createServer(): Promise<Express> {
    const PORT: number = 8081;
    const app: Express = express();

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
                console.log("Connection with database failed");
                console.log(err);
                return;
            }

            console.log("Database connected successfully.");
        }
    );

    mongoose.set("debug", true);

    app.get('/', (req, res) => res.send("Welcome to api"));
    app.listen(PORT, () => console.log(`[server] Server listening at http://localhost:${PORT}`));

    return app;
}
