import { setDisabled, unsetDisabled } from './utils.js';

const LOW_PRICE_MAX = 10000;
const HIGH_PRICE_MIN = 50000;
const filtersForm = document.querySelector('.map__filters');
const filters = filtersForm.querySelectorAll('fieldset, select');
const typeFilter = filtersForm.querySelector('#housing-type');
const priceFilter = filtersForm.querySelector('#housing-price');
const roomsFilter = filtersForm.querySelector('#housing-rooms');
const guestsFilter = filtersForm.querySelector('#housing-guests');
const featuresFilter = filtersForm.querySelector('#housing-features');

const resetFilters = ()=>{
  filtersForm.reset();
};

const disableFilters = ()=>{
  filtersForm.classList.add('map__filters--disabled');
  filters.forEach(setDisabled);
  resetFilters();
};

const activateFilters = ()=>{
  filtersForm.classList.remove('map__filters--disabled');
  filters.forEach(unsetDisabled);
};

const checkByType = (advert)=>{
  if(typeFilter.value !== 'any'){
    return advert.offer.type === typeFilter.value;
  }
  return true;
};

const checkByPrice = (advert)=>{
  switch (priceFilter.value){
    case 'high':
      return advert.offer.price >= HIGH_PRICE_MIN;
    case 'middle':
      return advert.offer.price >= LOW_PRICE_MAX && advert.offer.price <= HIGH_PRICE_MIN;
    case 'low':
      return advert.offer.price <= LOW_PRICE_MAX;
    default:
      return true;
  }};

const checkByRooms = (advert)=>{
  if(roomsFilter.value !== 'any'){
    return advert.offer.rooms === +roomsFilter.value;
  }
  return true;
};

const checkByGuests = (advert)=>{
  if(guestsFilter.value !== 'any'){
    return advert.offer.guests === +guestsFilter.value;
  }
  return true;
};

const getCheckedFeatures = ()=>Array.from(featuresFilter.querySelectorAll('input:checked'));

const checkByFeatures = (advert)=>{
  const advertFeatures = advert.offer.features;
  const features = getCheckedFeatures();
  if(features.length > 0 && advertFeatures === undefined){
    return false;
  }
  return features.every((feature)=>advertFeatures.includes(feature.value));
};

const handleFilterAdverts = (adverts, max)=>{
  const validAdverts = [];
  for(const advert of adverts){
    if(checkByType(advert) &&
       checkByPrice(advert) &&
       checkByRooms(advert) &&
       checkByGuests(advert) &&
       checkByFeatures(advert)){
      validAdverts.push(advert);
    }
    if(validAdverts.length === max){
      break;
    }
  }
  return validAdverts;
};

const setFilterChange = (renderAdverts)=>{
  filtersForm.addEventListener('change',()=>renderAdverts());
};

export {resetFilters, activateFilters, disableFilters, setFilterChange, handleFilterAdverts};
