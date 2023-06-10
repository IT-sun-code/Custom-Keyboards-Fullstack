const express = require("express");
const CardSlides = require("../models/CardSlides");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await CardSlides.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

//создание слайдеров
router.post("/", async (req, res) => {
  try {
    const newCardSlide = await CardSlides.create({
      ...req.body,
    });
    res.status(201).send(newCardSlide);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

// добавлять нужно 1 или более слайдов сразу
router
  .route("/:cardSlideId")
  .patch(async (req, res) => {
    try {
      const { cardSlideId } = req.params;
      const newCardSlide = await CardSlides.findByIdAndUpdate(
        cardSlideId,
        req.body,
        {
          new: true,
        }
      );
      res.status(201).send(newCardSlide);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })

  // удалять нужно 1 или более слайдов сразу
  .delete(async (req, res) => {
    try {
      const { cardSlideId } = req.params;
      const removedCardSlide = await Comment.findById(cardSlideId);
      if (removedCardSlide.userId.toString() === req.user._id) {
        await removedCardSlide.remove();
        return res.send(null);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports = router;
