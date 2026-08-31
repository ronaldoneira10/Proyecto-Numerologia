const Reading = require("../models/Reading");
const NumerologyProfile = require("../models/NumerologyProfile");
const gemini = require("../services/geminiservice");

const generate = async (req, res) => {

    try {

        const perfil = await NumerologyProfile.findOne({
            user_id: req.user.userId
        });

        if (!perfil) {
            return res.status(404).json({
                mensaje: "Perfil numerológico no encontrado"
            });
        }

        const prompt = `
Eres un asistente de numerología.

Realiza una interpretación clara y sencilla del siguiente perfil numerológico:

Número de vida: ${perfil.numero_vida}
Número de expresión: ${perfil.numero_expresion}
Número del alma: ${perfil.numero_alma}

Explica el significado de cada número
y después realiza una interpretación general del perfil.
`;

        const respuesta = await gemini.generarLectura(prompt);

        const lectura = await Reading.create({

            user_id: req.user.userId,

            prompt: prompt,

            respuesta: respuesta,

            tipo_lectura: "general"

        });

        res.status(201).json(lectura);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const history = async (req, res) => {

    try {

        const lecturas = await Reading.find({
            user_id: req.user.userId
        });

        res.json(lecturas);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    generate,
    history
};