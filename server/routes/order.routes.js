const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const Cart = require("../models/Cart");
const Orders = require("../models/Orders");
const router = express.Router({ mergeParams: true });

//получение заказов пользователя
router.get("/", auth, async (req, res) => {
  const { userId } = req.query;
  try {
    const order = await Orders.find({ userId });
    if (order) {
      return res.status(200).send(order);
    }
    res.status(404).send("Заказов не найдено");
  } catch (error) {
    res.status(500).send("Ошибка получения заказов пользователя");
  }
});

//обновление данных заказа
//В доставке->получено
router.patch("/:orderId", auth, async (req, res) => {
  const { orderId } = req.params;
  try {
    await Orders.findByIdAndUpdate(orderId, {
      isDelivered: true,
    });
    return res.status(200);
  } catch (error) {
    res.status(500).send("Ошибка изменения данных в заказе");
  }
});

//создание заказа и удаление корзины
router.post("/checkout", async (req, res) => {
  try {
    const { deliveryDate, currentDate, userId } = req.body;
    //find cart and user
    let cart = await Cart.findOne({ userId });
    let user = await User.findById(userId);

    if (cart) {
      const order = await Orders.create({
        userId: userId,
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
        isDelivered: false,
        orderDate: currentDate,
        deliveryDate: deliveryDate,
        orderAddress: user.address,
      });
      //delete cart
      await Cart.findByIdAndDelete({ _id: cart._id });
      res.status(201).send(order);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Ошибка создания заказа");
  }
});

module.exports = router;
