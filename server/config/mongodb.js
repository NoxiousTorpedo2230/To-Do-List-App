const mongoose = require('mongoose');

const mongoDb= async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connection Successfull: ${conn.connection.host}`)
    } catch (error) {
        console.log("Connection Failed", error);
    }
}

module.exports = mongoDb;