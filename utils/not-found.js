const notFoundError = (err, req, res, next) => {
    const message = err.message || 'Not Found'
    const statusCode = err.statusCode || 404

    res.status(statusCode).json({
        status: 'fail',
        message
    })
}

module.exports = notFoundError;