import { createCard } from './card.js';
import { activateFilters, disableFilters } from './map-filters.js';
import { activateForm, disableForm } from './form.js';

const mapBlock = document.querySelector('#map-canvas');

const isLoaded = true;

const renderAdverts = (adverts) => {
  if(isLoaded){
    const cards = [];
    adverts.forEach((advert) => {
      const card = createCard(advert);
      cards.push(card);
    });

    mapBlock.append(...cards);
  }
};


const handleFormsState = (status)=>{
  if(!status){
    disableForm();
    disableFilters();
  }else{
    activateForm();
    activateFilters();
  }
};

handleFormsState(isLoaded);

export {
  renderAdverts
};
