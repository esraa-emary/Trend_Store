const AppError = require("../utils/AppError");

const globalError = (err, req, res, next) => {
    let error = err;

    if (err.name === "ValidationError") {
        error = new AppError(400, "Validation Error");
    }

    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
};

module.exports = globalError;