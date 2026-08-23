require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const productsRouter = require("./routes/products.route");
const usersRouter = require("./routes/users.route");
const ordersRouter = require("./routes/orders.route");
// إضافة مسارات السلة والمفضلة
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

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
// تفعيل مسارات السلة والمفضلة
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