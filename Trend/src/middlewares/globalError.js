const appError = require("../utils/appError");

const globalError = (err, req, res, next) => {
    let error = err;

    if (err.name === "ValidationError") {
        error = new appError(400, "Validation Error");
    }

    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
};

module.exports = globalError;