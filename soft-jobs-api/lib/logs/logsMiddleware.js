export const HandleDatabaseLogs = (req, res, next) => {
    const time = new Date()
    const method = req.method
    const protocol = req.protocol
    const hostname = req.hostname
    const url = req.url
    const headers = JSON.stringify(req.headers)
    const token = req.token
    const queries = JSON.stringify(req.query)
    const body = JSON.stringify(req.body)
    const params = JSON.stringify(req.params)

    console.log(`
\x1b[7m********* Database Logs *********\x1b[0m

         \x1b[33m\x1b[1mTime:\x1b[0m ${time}
       \x1b[33m\x1b[1mMethod:\x1b[0m ${method}
     \x1b[33m\x1b[1mProtocol:\x1b[0m ${protocol}
     \x1b[33m\x1b[1mHostname:\x1b[0m ${hostname}
          \x1b[33m\x1b[1mURL:\x1b[0m ${url}
      \x1b[33m\x1b[1mHeaders:\x1b[0m ${headers}
       \x1b[33m\x1b[1mTokens:\x1b[0m ${token}
 \x1b[33m\x1b[1mQuery Params:\x1b[0m ${queries}
         \x1b[33m\x1b[1mBody:\x1b[0m ${body}
       \x1b[33m\x1b[1mParams:\x1b[0m ${params}

\x1b[7m******* End Database Logs *******\x1b[0m
        `)

    next()
}