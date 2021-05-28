import express, { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Gender } from '../models/user';
import { toHtmlDateString } from '../utils/date';

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

import UserService, { ReadUserResponse } from '../services/user';

let router = Router();

// Middleware to define ':id' parameter on url string.
router.use(
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        // If request(req) has id parameter, then bind id to request.params
        if (req.params && req.params.id && typeof req.params.id === 'string')
            req.params.id = req.params.id;
        next();
    }
);

router
    .route('/users')
    // (GET) List Users parameter
    .get(
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const users =
                    (await UserService.getUsers()) as ReadUserResponse[];
                const userResponse = users.map((user: any) => ({
                    userId: user.userId,
                    name: user.name,
                    birth_date: toHtmlDateString(user.birth_date),
                    gender: user.gender > 0 ? 'Female' : 'Male',
                    salary: user.salary,
                }));

                return res.status(200).json({ users: userResponse });
            } catch (err) {
                console.log({
                    err,
                });

                return res.status(500).json({
                    error: {
                        type: 'internal_server_error',
                        message: 'Internal Server Error',
                        error: err,
                    },
                });
            }
        }
    )
    // (POST) Create user parameter
    .post(
        body('name').isString(),
        body('birth_date').isDate(),
        body('gender')
            .isString()
            .matches(/female|male/i),
        body('salary').isString(),
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            const validationErr = validationResult(req);

            // Checking if validation has errors
            if (!validationErr.isEmpty()) {
                return res.status(400).json({
                    error: {
                        type: 'missing_parameters',
                        message: 'User information incomplete.',
                        errors: validationErr.array(), // Listing missing parameters
                    },
                });
            }

            // Get request body
            const name = req.body.name;
            const birth_date = new Date(req.body.birth_date); // Convert Date into Date type
            const gender =
                (req.body.gender as string).toLowerCase() === 'female'
                    ? Gender.Female
                    : Gender.Male;
            const salary = req.body.salary;

            // Creating User
            try {
                const createResposne = await UserService.createUser(
                    name,
                    birth_date,
                    gender,
                    salary
                );
                return res.status(201).json(createResposne);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
    );

router
    .route('/users/:id')
    // (GET) Read user parameter
    .get(async (req, res, next) => {
        // Reading User
        try {
            const readResponse: any = await UserService.readUser(req.params.id);
            return res.status(200).json({
                userId: readResponse.userId,
                name: readResponse.name,
                birth_date: toHtmlDateString(readResponse.birth_date),
                gender: readResponse.gender > 0 ? 'Female' : 'Male',
                salary: readResponse.salary,
            });
        } catch (err) {
            return res.status(404).json(err);
        }
    })
    // (PUT) update route definition
    .put(
        [
            // Validating POST parameters
            body('name').optional().isString(),
            body('birth_date').optional().isString(),
            body('gender').optional().isInt({ max: 1, min: 0 }),
            body('salary').optional().isString(),
        ],
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            const validationErr = validationResult(req);

            // If there is validation error
            if (!validationErr.isEmpty()) {
                return res.status(400).json({
                    error: {
                        type: 'invalid_parameters',
                        message: "Parameters don't meet requirements.",
                        errors: validationErr.array(),
                    },
                });
            }

            // Get body parameters
            const name = req.body.name;
            const birth_date = req.body.birth_date;
            const gender = req.body.gender;
            const salary = req.body.salary;

            // Check if at least one parameter is provided
            if (
                typeof name === 'undefined' &&
                typeof birth_date === 'undefined' &&
                typeof gender === 'undefined' &&
                typeof salary === 'undefined'
            ) {
                return res.status(400).json({
                    error: {
                        type: 'missing_parameter',
                        message:
                            "Parameters don't meet requirements, at least one parameter required.",
                    },
                });
            }

            // Define response data type
            const data: {
                name?: string;
                birth_date?: Date;
                gender?: Gender;
                salary?: string;
            } = {};

            // Instantiate available parameters
            if (name) data.name = name;
            if (birth_date) data.birth_date = new Date(birth_date);
            if (gender)
                data.gender = Number(gender) > 0 ? Gender.Male : Gender.Female;
            if (salary) data.salary = salary;

            // Update User
            try {
                const updateResponse = await UserService.updateUser(
                    req.params.id,
                    data
                );
                return res.status(201).json(updateResponse);
            } catch (err) {
                // Response if user id not known
                if (err.error.type === 'user_not_defined') {
                    return res.status(404).json(err);
                }

                return res.status(400).json(err);
            }
        }
    )
    .delete(async function (req, res, next) {
        // Deleting User
        try {
            const response = await UserService.deleteUser(req.params.id);
            return res.status(200).json(response);
        } catch (err) {
            // Response if user id not known
            if (err.error.type === 'user_not_defined') {
                return res.status(404).json(err);
            }

            return res.status(400).json(err);
        }
    });

export default router;
