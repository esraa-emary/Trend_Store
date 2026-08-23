const app = require("./src/app.js");

const connectDB = require("./src/config/connectDB");
connectDB()

const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Server is running at port ${port}`);
})