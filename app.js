const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const constant = require("./utils/constants");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/auth.route")(app);
require("./routes/audio.route")(app);

/**
 * Setup the mongodb connection and create on ADMIN user
 */
mongoose.connect(dbConfig.DB_URL, async() => {
    console.log("MongoDB connected");



    await User.collection.drop(); // Since this a dev setup

    const user = await User.create({

        userId: "admin",
        password: bcrypt.hashSync("Welcome1", 8),
        email: "tilakc434@gmail.com",
        userType: constant.userType.user
    });
    console.log("admin created", user);


})

/**
 * Start the express server
 */
app.listen(serverConfig.PORT, () => {
    console.log("Application has started on the port ", serverConfig.PORT);
})