class appError extends Error {
    constructor (s,m) {
        super(m)
        this.status = s
        this.isOperational = true
    }
}

module.exports = appError;