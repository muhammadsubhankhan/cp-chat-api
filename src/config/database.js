import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

module.exports = async () => {
    try {
        /**
         * connect to the mongodb server
         */

        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            // useFindAndModify: true,
            useUnifiedTopology: true,
        })
        mongoose.connection.on('dissconnted', (refs) => {
            throw new Error('MongoDB is disconnected')
        })
    } catch (error) {
        throw new Error(error)
    }
}
