import mongoose from 'mongoose' 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongo_url)
        console.log(`connected to database ${conn.Connection.name}`)//host
    } catch {
        console.log("error in mongodb")
    }
}
export default connectDB
