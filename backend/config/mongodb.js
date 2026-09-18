import mongoose, { connect } from 'mongoose'


const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("DataBase Is Connected"))
    await mongoose.connect(`${process.env.MONGOOSE_URI}`)
}

export default connectDB;