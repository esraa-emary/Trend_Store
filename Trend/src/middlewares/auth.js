const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
    try { // يحي
        // التحقق من وجود الهيدر وصيغته الصحيحة
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) { // يحي
            return next(new AppError(401, 'Please login first')); // يحي
        }

        const token = req.headers.authorization.split(" ")[1];
        
        // فك التشفير 
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        
        // البحث عن المستخدم بحقل isActive بدلاً من isDeleted
        const user = await User.findOne({ _id: decode.id, isActive: true }).select("+role"); // يحي
        
        // التحقق من أن المستخدم لا يزال موجوداً وحسابه نشط
        if (!user) { // يحي
            return next(new AppError(401, 'The user belonging to this token no longer exists or is deactivated.')); // يحي
        } // يحي

        req.user = user;
        next();

    } catch (error) { // يحي
        // معالجة أخطاء JWT بشكل مخصص
        if (error.name === 'JsonWebTokenError') { // يحي
            return next(new AppError(401, 'Invalid token. Please log in again.')); // يحي
        } // يحي
        if (error.name === 'TokenExpiredError') { // يحي
            return next(new AppError(401, 'Your token has expired. Please log in again.')); // يحي
        } // يحي
        
        // تمرير أي خطأ آخر للـ Global Error Handler
        return next(error); // يحي
    } // يحي
};

module.exports = auth;