import { createCard } from './card.js';

const mapBlock = document.querySelector('#map-canvas');

const renderAdverts = (adverts) => {

  const cards = [];
  adverts.forEach((advert) => {
    const card = createCard(advert);
    cards.push(card);
  });

  mapBlock.append(...cards);
};


export {
  renderAdverts
};
