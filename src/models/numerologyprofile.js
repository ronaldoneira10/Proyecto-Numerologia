const mongoose = require("mongoose");

const numerologyProfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    numero_vida: Number,
    numero_expresion: Number,
    numero_alma: Number
});

module.exports = mongoose.model(
    "NumerologyProfile",
    numerologyProfileSchema
);