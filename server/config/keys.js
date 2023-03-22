if (process.env.MONGODB === "production") {
    module.exports = require("./prod");
}
else {
    module.exports = require("./dev");
}