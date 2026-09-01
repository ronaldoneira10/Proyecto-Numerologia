const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const {
            nombre_completo,
            email,
            password,
            fecha_nacimiento
        } = req.body;

        if (!nombre_completo || !email || !password || !fecha_nacimiento) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            nombre_completo,
            email,
            password_hash,
            fecha_nacimiento
        });

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: user._id,
                nombre_completo: user.nombre_completo,
                email: user.email,
                fecha_nacimiento: user.fecha_nacimiento
            }
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "El email y la contraseña son obligatorios"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            mensaje: "Login correcto",
            token
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    register,
    login
};

