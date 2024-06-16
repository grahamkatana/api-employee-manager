"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const today = new Date();
const yyyy = today.getFullYear();
let mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
let dd = String(today.getDate()).padStart(2, '0');
const logsFolder = `./logs/`;
const loggerTransports = [
    new winston_1.transports.File({
        level: 'info',
        filename: `${logsFolder}${yyyy}-${mm}-${dd}_logs.log`
    })
];
const loggerRequestTransports = [
    new winston_1.transports.File({
        level: 'warn',
        filename: `${logsFolder}${yyyy}-${mm}-${dd}_request_warnings.log`
    }),
    new winston_1.transports.File({
        level: 'error',
        filename: `${logsFolder}${yyyy}-${mm}-${dd}_request_errors.log`
    })
];
if (process.env.NODE_ENV !== 'production') {
    // loggerTransports.push(
    //     new transports.Console()
    // )
    loggerRequestTransports.push(new winston_1.transports.File({
        level: 'info',
        filename: `${logsFolder}${yyyy}-${mm}-${dd}_request_info.log`
    }));
}
const logger = (0, winston_1.createLogger)({
    transports: loggerTransports,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint())
});
const requestLogger = (0, winston_1.createLogger)({
    transports: loggerRequestTransports,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint())
});
module.exports = {
    logger,
    requestLogger,
    logsFolder
};
