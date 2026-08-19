const chalk = require("chalk");
const app = require("./app.js");

const connectDB = require("./config/connectDB");
connectDB()

const port = process.env.PORT

app.listen(port,() => {
    console.log(chalk.bgGreen(`Server is running at port ${port}`));
})