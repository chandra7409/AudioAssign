/**
 * This file will contains the logic for routing request
 * 
 * This file is dedicated to the routing logic for sign up and sign in
 */
const authController = require("../controller/auth.controller");
const { verifySignUp } = require("../middlewares")
module.exports = (app) => {
    /**
     * POST   /audio/api/v1/auth/signup
     */
    app.post("/audio/api/v1/auth/signup", [verifySignUp.validateSignUpRequestBody], authController.signup);

    /**
     * LOGIN
     * 
     * POST /audio/api/v1/auth/login
     */
    app.post("/audio/api/v1/auth/signin", [verifySignUp.validateSignInRequestBody], authController.signin);
};