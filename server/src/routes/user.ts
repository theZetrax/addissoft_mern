import { Router } from 'express';

/**
 * Here are our defined routes. There are four routes
 * 
 * 1. List all Users (GET)
 * 2. View User Details (GET)
 * 3. Create User (POST)
 * 4. Update User (PUT)
 * 5. Remove User (DELETE)
 * 
 * @author Zablon Dawit
 */

let router = Router();

router.get('/users', (req, res, next) => {
    res.json({
        message: "welcome"
    });
});

export default router;