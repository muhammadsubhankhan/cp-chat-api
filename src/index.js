import express from 'express'
import lumie from 'lumie'
import bodyParser from 'body-parser'
import path from 'path'
import dotenv from 'dotenv'
;(async () => {
    /**
     * initiate the express server instance
     */
    const app = express()

    dotenv.config()
    /**
     * parse the form data from body using body parser
     */
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    )

    const cors = require('cors')({
        origin: true,
    })
    app.use(cors)
    /**
     * connect to the database wait for the connection then proceed
     */
    await require('./config/database')()
    /**
     * parse the json from body using body parser
     */
    app.use(
        bodyParser.json({
            limit: '100mb',
        })
    )
    /*
     * pass server to socket instances and setup events
     */
    const server = require('./config/socket')(app)
    /**
     * Bind routes with express app
     */
    lumie.load(app, {
        preURL: 'api',
        verbose: true,
        ignore: ['*.spec', '*.action', '*.md'],
        controllers_path: path.join(__dirname, 'controllers'),
    })
    server.listen(process.env.PORT || 3030, () => {
        // eslint-disable-next-line no-console
        console.log(' App is running on ', process.env.PORT || 3030)
    })
})()
