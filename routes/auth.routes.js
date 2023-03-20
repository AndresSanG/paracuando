const express = require('express');
const router = express.Router();

const passport = require('../libs/passport');

const verifySchema = require('../schemas/joiSchema.checker');
const {
  signupSchema,
  forgetPasswordSchema,
  restorePasswordSchema,
} = require('../schemas/auth.schemas');

const {
  signUp,
  logIn,
  forgetPassword,
  restorePassword,
  userToken,
} = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: check the user credentials and generate a token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: correct credentials
 *      404:
 *        description: user not found
 */

router.post('/login', logIn);

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *  post:
 *    summary: sign up a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              first_name:
 *                type: string
 *              last_name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      201:
 *        description: succes sign Up
 *      404:
 *        description: somthing goes bad
 */

router.post('/sign-up', verifySchema(signupSchema, 'body'), signUp);

/**
 * @swagger
 * /api/v1/auth/forget-password:
 *  post:
 *    summary: recover password
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *    responses:
 *      200:
 *        description: Email sended check yor inbox
 */

router.post(
  '/forget-password',
  verifySchema(forgetPasswordSchema, 'body'),
  forgetPassword
);

/**
 * @swagger
 * /api/v1/auth/change-password/{token}:
 *  post:
 *    summary: recover password
 *    parameters:
 *      - in: path
 *        name: token
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: update success
 *      404:
 *        description: user not found
 */

router.post(
  '/change-password/:token',
  verifySchema(restorePasswordSchema, 'body'),
  restorePassword
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  userToken
);

router.get(
  '/testing',
  passport.authenticate('jwt', { session: false }),
  async (request, response, next) => {
    try {
      return response.status(200).json({
        results: {
          user: request.user,
          isAuthenticated: request.isAuthenticated(),
          isUnauthenticated: request.isUnauthenticated(),
          _sessionManager: request._sessionManager,
          authInfo: request.authInfo,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = router;
