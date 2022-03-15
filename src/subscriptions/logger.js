import winston from "winston";

const loggerFilter = winston.format((info,filter) => {
    if(info.level == filter || info.level == filter) return info;
    return false;
});

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({
            level:"silly",
            format:winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({format:"DD-M-YY hh:mm:ss"}),
                winston.format.printf((data)=>{
                    const {level,timestamp,message} = data;
                    return `[${level}] - ${timestamp} - ${message}`;
                }),
            ),
        }),new winston.transports.File({
            filename:"warn.log",
            dirname:"./src/test/logs",
            format:winston.format.combine(
                loggerFilter("warn"),
                winston.format.prettyPrint()
            ),
        }),new winston.transports.File({
            filename:"error.log",
            dirname:"./src/test/logs",
            format:winston.format.combine(
                loggerFilter("error"),
                winston.format.prettyPrint()
            ),
        }),
    ]
});

export default logger;