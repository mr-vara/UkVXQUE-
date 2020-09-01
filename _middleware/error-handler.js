/**
 * Error Handler module which is a glober error handler for entire project
 */
module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case err.statusCode === 404:
            // Not found error
            return res.status(404).json(err);
        case typeof err === 'string':
            // Not found error
            return res.status(400).json({ message: err });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({ message: 'Unauthorized' });
        default:
            return res.status(500).json({ message: err.message });
    }
}