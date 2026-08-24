require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const productsRouter = require("./routes/product.route");
const usersRouter = require("./routes/user.route");
const ordersRouter = require("./routes/order.route");
const authRouter = require("./routes/auth.route");
const wishlistRouter = require("./routes/wishlist.route");
const cartRouter = require("./routes/cart.route");
const globalError = require("./middlewares/globalError");
const app = express()

app.use(express.json());
app.use(morgan("dev"));

app.get("/" , (req,res) => {
    res.status(200).json({
        success : true ,
        message : "Welcome to server"
    })
})

app.use("/auth", authRouter);
app.use("/product",productsRouter);
app.use("/user",usersRouter);
app.use("/order",ordersRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);

app.use((req,res) => {
    res.status(404).json({
        success : false ,
        message : '404 Page not Found'
    })
})

app.use(globalError)

module.exports = app;