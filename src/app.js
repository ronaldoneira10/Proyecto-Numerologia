
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authroutes");
const numerologyRoutes = require("./routes/numerologyroutes");
const readingRoutes = require("./routes/readingroutes");
const compatibilityRoutes = require("./routes/compatibilityroutes");

const auditMiddleware = require("./middlewares/auditMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use(auditMiddleware);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/numerology", numerologyRoutes);
app.use("/api/v1/readings", readingRoutes);
app.use("/api/v1/compatibility", compatibilityRoutes);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API de Numerología funcionando"
    });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
