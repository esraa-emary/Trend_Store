const app = require("./app.js");

const connectDB = require("./config/connectDB");
connectDB()

const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Server is running at port ${port}`);
})