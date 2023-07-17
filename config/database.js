const mongoose = require('mongoose');

const DB = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => { console.log("DB connected"); });
}

module.exports = DB;