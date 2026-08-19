const mongoose = require("mongoose");
const chalk = require("chalk");


async function connectDB() {
    try {
        const con = await mongoose.connect(process.env.LOCAL_DATABASE)
        console.log(chalk.bgBlue(`Database is connected successfully at ${con.connection.name}`));
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB