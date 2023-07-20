const statusObject = require('./statusCodes');
const ErrorHandle = (Error, req, res, next)=>{
    res.status(Error.status || 500);
    res.send(statusObject.Error_json(`${Error.status || 500}`, `${Error.message || 'Internal server error'}`, `${Error.message || 'Internal server error'}`))
}

module.exports = ErrorHandle;