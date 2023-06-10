const Cards = require("../models/Cards");
const CardSlides = require("../models/CardSlides");
const MainSlides = require("../models/MainSlides");
const Employees = require("../models/Employees");

const cardsMock = require("../mock/cards.json");
const cardSlidesMock = require("../mock/cardSlides.json");
const mainSlidesMock = require("../mock/mainSlides.json");
const employeesMock = require("../mock/employees.json");

module.exports = async () => {
  const cards = await Cards.find();
  if (cards.length !== cardsMock.length) {
    await createInitialEntity(Cards, cardsMock);
  }

  const cardSlides = await CardSlides.find();
  if (cardSlides.length !== cardSlidesMock.length) {
    await createInitialEntity(CardSlides, cardSlidesMock);
  }

  const mainSlides = await MainSlides.find();
  if (mainSlides.length !== mainSlidesMock.length) {
    await createInitialEntity(MainSlides, mainSlidesMock);
  }

  const employees = await Employees.find();
  if (employees.length !== employeesMock.length) {
    await createInitialEntity(Employees, employeesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
