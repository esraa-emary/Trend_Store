require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

require("./models/user.model");
require("./models/product.model");
require("./models/order.model");
require("./models/cart.model");

const productsRouter = require("./routes/product.route");
const usersRouter = require("./routes/user.route");
const ordersRouter = require("./routes/order.route");
const authRouter = require("./routes/auth.route");
const cartRouter = require("./routes/cart.route");
const globalError = require("./middlewares/globalError");
const app = express()

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: `http://localhost:4200`
}))

app.get("/" , (req,res) => {
    res.status(200).json({
        success : true ,
        message : "Welcome to server"
    })
})

app.use("/auth", authRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);
app.use("/orders",ordersRouter);
app.use("/cart", cartRouter);

app.use((req,res) => {
    res.status(404).json({
        success : false ,
        message : '404 Page not Found'
    })
})

app.use(globalError)

module.exports = app;