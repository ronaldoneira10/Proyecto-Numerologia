const NumerologyProfile = require("../models/numerologyprofile");
const User = require("../models/user");
const numerology = require("../services/numerologyservice");


const calculate = async (req, res) => {

    try {

        const usuario = await User.findById(req.user.userId);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const vida = numerology.numeroVida(
            usuario.fecha_nacimiento
        );

        const expresion = numerology.numeroExpresion(
            usuario.nombre_completo
        );

        const alma = numerology.numeroAlma(
            usuario.nombre_completo
        );

        const perfil = await NumerologyProfile.create({

            user_id: usuario._id,

            numero_vida: vida,

            numero_expresion: expresion,

            numero_alma: alma

        });

        res.status(201).json(perfil);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};


const profile = async (req, res) => {

    try {

        const perfil = await NumerologyProfile.findOne({
            user_id: req.user.userId
        });

        if (!perfil) {
            return res.status(404).json({
                mensaje: "Perfil numerológico no encontrado"
            });
        }

        res.json(perfil);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};


module.exports = {
    calculate,
    profile
};