const express = require("express");
const User = require("../models/User");
const Cards = require("../models/Cards");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

//получение понравившихся товаров
router.get("/favorites", auth, async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findById(userId);
    const list = await Cards.find({ _id: { $in: user.favorites } });
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

//обновление пользователя
//лайк продукта
router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.send(updatedUser);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

//получение пользователя
router.get("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.send(user);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
