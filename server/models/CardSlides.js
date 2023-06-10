const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    cardId: {
      // Добавила связь слайдов к карточкам
      type: Schema.Types.ObjectId,
      ref: "Cards",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("CardSlides", schema);
