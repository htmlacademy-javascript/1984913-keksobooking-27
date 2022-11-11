const LOW_PRICE_MAX = 10000;
const HIGH_PRICE_MIN = 50000;
const filtersForm = document.querySelector('.map__filters');
const filters = filtersForm.querySelectorAll('fieldset, select');
const typeFilter = filtersForm.querySelector('#housing-type');
const priceFilter = filtersForm.querySelector('#housing-price');
const roomsFilter = filtersForm.querySelector('#housing-rooms');
const guestsFilter = filtersForm.querySelector('#housing-guests');
const featuresFilter = filtersForm.querySelectorAll('.map__checkbox');

const resetFilters = ()=>{
  filtersForm.reset();
};

const disableFilters = ()=>{
  filtersForm.classList.add('map__filters--disabled');
  filters.forEach((filter)=>{
    filter.disabled = true;
  });
  resetFilters();
};

const activateFilters = ()=>{
  filtersForm.classList.remove('map__filters--disabled');
  filters.forEach((filter)=>{
    filter.disabled = false;
  });
};

const filterByType = (advert)=>{
  if(typeFilter.value !== 'any'){
    return advert.offer.type === typeFilter.value;
  }
  return true;
};

const filterByPrice = (advert)=>{
  switch (priceFilter.value){
    case 'high':
      return advert.offer.price > HIGH_PRICE_MIN;
    case 'middle':
      return advert.offer.price > LOW_PRICE_MAX && advert.offer.price <= HIGH_PRICE_MIN;
    case 'low':
      return advert.offer.price <= LOW_PRICE_MAX;
    case 'any':
      return true;
  }};

const filterByRooms = (advert)=>{
  if(roomsFilter.value !== 'any'){
    return advert.offer.rooms === +roomsFilter.value;
  }
  return true;
};

const filterByGuests = (advert)=>{
  if(guestsFilter.value !== 'any'){
    return advert.offer.guests === +guestsFilter.value;
  }
  return true;
};

const getCheckedFeatures = ()=>{
  const checkedFeatures = [];
  featuresFilter.forEach((feature)=> {
    if(feature.checked){
      checkedFeatures.push(feature.value);
    }
  });
  return checkedFeatures;
};

const filterByFeatures = (advert)=>{
  const advertFeatures = advert.offer.features;
  const features = getCheckedFeatures();
  if(features.length > 0 && advertFeatures === undefined){
    return false;
  }
  return features.every((feature)=>advertFeatures.includes(feature));
};

const handleFilterAdverts = (advert)=>filterByType(advert) && filterByPrice(advert) && filterByRooms(advert) && filterByGuests(advert) && filterByFeatures(advert);

const setFilterChange = (renderAdverts)=>{
  typeFilter.addEventListener('change',()=>renderAdverts());
  priceFilter.addEventListener('change',()=>renderAdverts());
  roomsFilter.addEventListener('change',()=>renderAdverts());
  guestsFilter.addEventListener('change',()=>renderAdverts());
  featuresFilter.forEach((feature)=> feature.addEventListener('click', ()=>renderAdverts()));
};

export {resetFilters, activateFilters, disableFilters, setFilterChange, handleFilterAdverts};
