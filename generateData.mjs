import { faker } from '@faker-js/faker';
import fs from 'fs';

const fits = [];
const categories = [];
const items = [];

const shuffle = (array, n) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());

  return shuffledArray.slice(0, n);
};

const generateItem = (index) => {
  const item = {
    id: index,
    name: faker.commerce.productName(),
    brand: faker.company.bs(),
    price: faker.commerce.price(0, 100, 2, '$'),
    fits: shuffle(fits, 6), //need to add year
    categories: shuffle(categories, 4),
    notes: faker.commerce.productDescription(),
    partNumber: faker.finance.routingNumber(),
    availableQuanitity: faker.finance.amount(0, 100, 0),
    warranty: faker.lorem.paragraph(1),
  };

  return item;
};

for (let i = 0; i < 30; i++) {
  const fit = {
    year: faker.commerce.price(1980, 2023, 0),
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
  };

  fits.push(fit);
}

for (let i = 0; i < 30; i++) {
  categories.push(faker.color.human());
}

for (let i = 0; i < 500; i++) {
  items.push(generateItem(i));
}

// const jsonString = JSON.stringify([])
const jsonString = JSON.stringify(items, null, 2);

fs.writeFile('src/data.json', jsonString, (err, result) => {
  if (err) console.log('error', err);
});
