const AuditLog = require("../models/AuditLog");

const auditMiddleware = async (req, res, next) => {

    res.on("finish", async () => {

        try {

            await AuditLog.create({
                endpoint: req.originalUrl,
                metodo: req.method,
                status_code: res.statusCode,
                user_id: req.user ? req.user.userId : null
            });

        } catch (error) {

            console.log("Error guardando auditoría");

        }
    });

    next();
};

module.exports = auditMiddleware;