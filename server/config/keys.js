if (process.env.MONGODB_URI === "production") {
    module.exports = require("./prod");
}
else {
    module.exports = require("./dev");
}