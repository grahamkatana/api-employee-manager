import { createLogger,transports, format } from "winston";
const today = new Date();
const yyyy = today.getFullYear();
let mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
let dd = String(today.getDate()).padStart(2, '0');
const logsFolder = `./logs/`

const loggerTransports = [
    new transports.File({
        level: 'info',
        filename: `${logsFolder}${yyyy}-${mm}-${dd}_logs.log`
    })
]

const loggerRequestTransports = [
    new transports.File({
        level: 'warn',
        filename: `${logsFolder}${yyyy}-${mm}-${dd}_request_warnings.log`
    }),
    new transports.File({
        level: 'error',
        filename: `${logsFolder}${yyyy}-${mm}-${dd}_request_errors.log`
    })
]

if (process.env.NODE_ENV !== 'production') {
    // loggerTransports.push(
    //     new transports.Console()
    // )

    loggerRequestTransports.push(
        new transports.File({
            level: 'info',
            filename: `${logsFolder}${yyyy}-${mm}-${dd}_request_info.log`
        })
    )
}

const logger = createLogger({
    transports: loggerTransports,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    )
})

const requestLogger = createLogger({
    transports: loggerRequestTransports,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    )
})




module.exports = {
    logger,
    requestLogger,
    logsFolder
}