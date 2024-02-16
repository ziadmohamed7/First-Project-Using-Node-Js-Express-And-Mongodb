const {constants} = require("../constants");
const errorHandel = (req,res,next,error )=>{
    const statusCode  = res.statusCode ? statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.send({
                title:"Validation failed",
                message : error.message,
                stackTrack : error.stack
            });            
            break;
        case constants.NOT_FOUND:
            res.send({
                title: "Not Found",
                message : error.message,
                stackTrack:error.stack
            });
        
        case constants.FORBIDDEN:
            res.send({
                title: "FORBIDDEN",
                message : error.message,
                stackTrack:error.stack
            });

        case constants.SERVER_ERROR:
            res.send({
                title: "SERVER_ERROR",
                message : error.message,
                stackTrack:error.stack
            });

        case constants.UNAUTHORIZED:
            res.send({
                title: "UNAUTHORIZED",
                message : error.message,
                stackTrack:error.stack
            });
            break;    
        default:
            break;
    }
    next();
};

module.exports = errorHandel;