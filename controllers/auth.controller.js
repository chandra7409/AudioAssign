const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../Utils/constants");
/**
 * Logic to accept the registration/signup
 * 
 * req --> What we get from the client
 * res --> What we return from the server
 */
exports.signup = async(req, res) => {

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: req.body.userStatus
    };

    /**
     * insert the data and return the response
     */
    try {
        const userCreated = await User.create(userObj);

        const response = {
            name: userCreated.name,
            userid: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }

        res.status(201).send(response);
    } catch (err) {
        console.log("Some error happened ", err.message);
        res.status(500).send({
            message: "Some internal server error"
        });
    }


}


exports.signin = async(req, res) => {

    /**
     * If the userId passed is correct
     */
    try {
        const user = await User.findOne({ userId: req.body.userId });
        if (user == null) {
            return res.status(400).send({
                message: "Failed ! UserId passed doesn't exist"
            });
        }
        /**
         * Check if the user is in PENDING state
         */
        if (user.userStatus == constants.userStatus.pending) {
            return res.status(400).send({
                message: "Not yet approved from the admin"
            })
        }
        /**
         * If the password passed is correct
         */
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Wrong password"
            });
        }



        /**
         * Create the JWT token
         */
        const token = jwt.sign({
            id: user.userId
        }, authConfig.secret, {
            expiresIn: 600
        });

        /**
         * Send the successfull login response
         */
        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            accessToken: token
        });
    } catch (err) {
        console.log("Internal error , ", err.message);
        res.status(500).send({
            message: "Some internal error while signin"
        });
    }
}