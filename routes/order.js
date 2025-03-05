const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const Order = require("../models/Order.js");
const isAdmin = require("../middlewares/isAdmin.js");
const router = express.Router();

router.post("/orders", isAuthenticated, async (req, res) => {
  try {
    const { products, address, price } = req.body;
    await Order.create({
      owner: req.user._id,
      products: products,
      address: address,
      price: price,
      delivered: false,
    });
    res.status(201).json({ message: "Order created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/orders/mark-delivered/:id",
  isAuthenticated,
  isAdmin,
  async (req, res) => {
    try {
      await Order.findByIdAndUpdate(req.params.id, { delivered: true });
      res.json({ message: "Updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/orders", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("owner").populate({path:'products',populate:{path:'product'}})
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
