const express = require("express");
const Cards = require("../models/Cards");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Cards.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Cards.findById(cardId);
    res.status(200).send(card);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

//ФУНКЦИЮ НЕ ТРОГАТЬ
// для администратора
router.post("/", async (req, res) => {
  try {
    const newCard = await Cards.create({
      ...req.body,
    });

    res.status(201)
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router
  .route("/:cardId")
  .patch(async (req, res) => {
    try {
      const { cardId } = req.params;
      const newCard = await Cards.findByIdAndUpdate(cardId, req.body, {
        new: true,
      });

      res.status(201).send(newCard);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })

  .delete(async (req, res) => {
    try {
      const { cardId } = req.params;
      await Cards.findByIdAndDelete(cardId);
      return res.send("deleted");
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports = router;
