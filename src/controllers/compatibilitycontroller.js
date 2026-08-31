const CompatibilityMatch = require("../models/CompatibilityMatch");
const NumerologyProfile = require("../models/NumerologyProfile");
const { generarLectura } = require("../services/geminiservice");

const check = async (req, res) => {
    try {
        const { usuario_2 } = req.body;

        const usuario_1 = req.user.userId;

        const perfil1 = await NumerologyProfile.findOne({
            user_id: usuario_1
        });

        const perfil2 = await NumerologyProfile.findOne({
            user_id: usuario_2
        });

        if (!perfil1 || !perfil2) {
            return res.status(404).json({
                error: "No se encontraron los perfiles numerológicos"
            });
        }

        const puntaje =
            perfil1.numero_vida === perfil2.numero_vida ? 100 : 50;

        const prompt = `
Analiza la compatibilidad numerológica entre dos usuarios.

Usuario 1:
Número de vida: ${perfil1.numero_vida}
Número de expresión: ${perfil1.numero_expresion}
Número de alma: ${perfil1.numero_alma}

Usuario 2:
Número de vida: ${perfil2.numero_vida}
Número de expresión: ${perfil2.numero_expresion}
Número de alma: ${perfil2.numero_alma}

Puntaje de compatibilidad: ${puntaje}

Genera una interpretación de la compatibilidad entre ambos usuarios.
`;

        const interpretacion_ia = await generarLectura(prompt);

        const resultado = await CompatibilityMatch.create({
            usuario_1,
            usuario_2,
            puntaje,
            interpretacion_ia
        });

        res.status(201).json(resultado);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    check
};

