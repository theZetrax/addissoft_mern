/**
 * This file contains configuration for mongoose,
 * sets up mongodb database.
 * 
 * @author Zablon Dawit
 */

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// TODO: FIXME: Set debugging here

// Database Options
const opts: mongoose.ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Retry send operations for 5 seconds
    socketTimeoutMS: 45000 // Close socket after 45 Seconds
};
const url: string = "mongodb://mongo:27017/users";

class MongoConnection {
    private static _instance: MongoConnection;

    /**
     * Returns the database connection singleton instance, that an object is shared accross
     * the whole program.
     *  
     * @returns {MongoConnection} Instance of the mongodb connection.
     */
    static getInstance(): MongoConnection {
        // If connection is not created.
        if (!MongoConnection._instance) {
            MongoConnection._instance = new MongoConnection();
        }
        return MongoConnection._instance;
    }

    public async open(): Promise<void> {
        try {
            mongoose.connect(
                url,
                opts
            );

            // Using events to handle connection state.
            mongoose.connection.on('connected', () => {
                console.log('Database connected.');
            });

            mongoose.connection.on('disconnected', () => {
                console.log('Database disconnected.');
            });

            mongoose.connection.on('error', (err) => {
                console.log(`[db.connection:error] ${err}`);

                // If connection not established,
                // retry connecting after 5 seconds.
                if (err.name === 'MongoNetworkError') {
                    setTimeout(() => {
                        mongoose.connect(url, opts);
                    }, 5000);
                }
            })
        } catch (err) {
            // TODO: Add logger if possible.
            console.log(`[db.open:error] ${err}`); // If error occur log to console.
            throw err;
        }
    }

    public async close(): Promise<void> {
        try {
            await mongoose.disconnect(); // Closing mongodb connection
        } catch (err) {
            console.log(`[db.close:error] ${err}`);
        }
    }
}

export default MongoConnection.getInstance();
