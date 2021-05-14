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

router.route('/users')
    .get(function(req, res, next) { 
        res.send({ message: 'welcome' });
    })
    .post(function(req, res, next) { /** Create User */ });

router.route('/user/:id')
    .get(function(req, res, next) { /** Get User Details */ })
    .put(function(req, res, next) { /** Edit User Details */ })
    .delete(function(req, res, next) { /** Delete User Details */ });

export default router;