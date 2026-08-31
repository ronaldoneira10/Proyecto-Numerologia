const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
    endpoint: String,
    metodo: String,
    status_code: Number,
    timestamp: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("AuditLog", auditLogSchema);