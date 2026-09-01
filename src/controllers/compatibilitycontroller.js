
const CompatibilityMatch = require("../models/compatibilitymatch");
const NumerologyProfile = require("../models/numerologyprofile");
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

        // Verificar que ambos tengan perfil numerológico
        if (!perfil1 || !perfil2) {
            return res.status(404).json({
                error: "No se encontraron los perfiles numerológicos"
            });
        }

        // Calcular puntaje de compatibilidad
        const puntaje =
            perfil1.numero_vida === perfil2.numero_vida ? 100 : 50;

        // Crear prompt para Gemini
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

Genera una interpretación clara y detallada de la compatibilidad entre ambos usuarios.
Explica los aspectos positivos, posibles dificultades y recomendaciones.
`;

        // Generar interpretación mediante Gemini
        const interpretacion_ia = await generarLectura(prompt);

        // Guardar resultado en MongoDB
        const resultado = await CompatibilityMatch.create({
            usuario_1,
            usuario_2,
            puntaje,
            interpretacion_ia
        });

        // Responder al cliente
        res.status(201).json(resultado);

    } catch (error) {
        console.error("Error en compatibilidad:", error);

        res.status(500).json({
            error: "Error al comprobar la compatibilidad",
            detalle: error.message
        });
    }
};

module.exports = {
    check
};

