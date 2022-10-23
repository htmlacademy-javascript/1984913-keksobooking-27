import { createCard } from './card.js';
import {handleFormState} from'./form.js';

const mapBlock = document.querySelector('#map-canvas');

const isLoaded = false;

const renderAdverts = (adverts) => {
  const cards = [];
  adverts.forEach((advert) => {
    const card = createCard(advert);
    cards.push(card);
  });

  mapBlock.append(...cards);
};


handleFormState(isLoaded);


export {
  renderAdverts
};
