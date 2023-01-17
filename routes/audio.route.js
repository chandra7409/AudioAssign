const audioController = require("../controllers/audio.controller")

module.exports = (app) => {


    app.post("/audio/api/v1/auth", audioController.createAudio);
    app.get("/audio/api/v1/auth/:id", audioController.getAudio);
    app.put("/audio/api/v1/auth/:id", audioController.updateAudio);
    app.delete("/audio/api/v1/auth/:id", audioController.deleteAudio);



}