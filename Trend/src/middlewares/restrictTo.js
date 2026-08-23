const appError = require("../utils/appError")


const restrictTo = (...userRole) => (req,res,next) => {
    const {role} = req.user 
    if (userRole.includes(role)) {
        return next()
    } else {
        return next(new appError(403,'This route is protected for admin'))
    }
}

module.exports = restrictTo