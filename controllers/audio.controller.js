const Audio = require("../models/audio.model");

// Create and Save a new Audio
exports.createAudio = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Audio
    const user = new Audio({
        name: req.body.name,
        description: req.body.description,
        song: req.body.song,
        image: req.body.image,
    });

    // Save Audio in the database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Audio."
            });
        });
};



// Find a single Audio with an id
exports.getAudio = (req, res) => {
    const id = req.params.id;

    Audio.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Audio with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Audio with id=" + id });
        });
};

// Update a Audio by the id in the request
exports.updateAudio = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Audio.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Audio with id=${id}. Maybe Audio was not found!`
                });
            } else res.send({ message: "Audio was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Audio with id=" + id
            });
        });
};

// Delete a Audio with the specified id in the request
exports.deleteAudio = (req, res) => {
    const id = req.params.id;

    Audio.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Audio with id=${id}. Maybe Audio was not found!`
                });
            } else {
                res.send({
                    message: "Audio was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Audio with id=" + id
            });
        });
};