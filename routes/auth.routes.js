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
 *        descrption: correct credentials
 */

router.post('/login', logIn);

router.post('/sign-up', verifySchema(signupSchema, 'body'), signUp);

router.post(
  '/forget-password',
  verifySchema(forgetPasswordSchema, 'body'),
  forgetPassword
);

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
