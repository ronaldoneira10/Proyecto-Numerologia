const errorMiddleware = (err, req, res, next) => {

    console.log(err.message);

    res.status(err.status || 500).json({
        mensaje: err.message || "Ocurrió un error en el servidor"
    });

};

module.exports = errorMiddleware;