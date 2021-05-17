import express, { Express } from 'express';
import userRoutes from '../routes/user';

/**
 * Contains Express server definition.
 * 
 * @author Zablon Dawit
 */

/**
 * Generates server instance.
 * 
 * @returns {Promise<Express>} Server Instance.
 */
export async function createServer(): Promise<Express> {
    const app: Express = express();

    app.use(express.json());
    
    // Use routes defined in routes file.
    app.use(userRoutes);

    return app;
}