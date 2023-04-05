const mongoose = require("mongoose");
// const { mongoURI } = require("./keys");

const mongoConnect = () => {
     const mongoDBUrl=process.env.MONGODB_URI
    try {
        mongoose.connect(mongoDBUrl, {
            // useNewUrlParser: true,
             useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.log("Error while DB connection");
    }
}

module.exports = mongoConnect;