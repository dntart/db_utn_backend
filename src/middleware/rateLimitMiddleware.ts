import rateLimit from "express-rate-limit";

const limiter = rateLimit({  //invocacion del rataLimit
    windowMs: 15 * 60 * 1000,    //siempre en milisegundos 15min este caso
    max: 5,
    handler: (req, res, next, options) => {
        res.status(429).json({
            succes: false,
            error: `Limite alcanzado (${options.max}) , reintenta en ${options.windowMs /1000/60} minutos`
        })  //status 429 to many request
    }
})
export default limiter