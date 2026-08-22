require("dotenv").config();

const app = require("./index");
const connectDB = require("./config/connectDB");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();