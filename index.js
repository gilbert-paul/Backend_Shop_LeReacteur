const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv')

const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");



const app = express();
app.use(express.json());
dotenv.config()
const PORT = process.env.PORT;
app.use(cors())

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

mongoose.connect(process.env.MONGODB_URI || '');

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(PORT, () => console.log("Server started"));
