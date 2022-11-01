import {createSlider, updateSliderValues,updateHandlePlace, handlePrice, disableSlider} from './slider.js';
import {resetFilters} from './map-filters.js';
import {resetMap} from './map.js';
const advertForm = document.querySelector('.ad-form');
const fields = advertForm.querySelectorAll('fieldset');
const addressField = advertForm.querySelector('#address');
const roomsMaxCapacity = {
  1: 1,
  2: 2,
  3: 3,
  100: 0
};
const typeToMinPrice = {
  bungalow:0,
  flat: 1000,
  hotel:3000,
  house: 5000,
  palace: 10000,
};
const MAX_PRICE = 100000;
const roomsField = advertForm.querySelector('#room_number');
const capacityField = advertForm.querySelector('#capacity');
const typeField = advertForm.querySelector('#type');
const priceField = advertForm.querySelector('#price');
const defaultType = typeField.options[typeField.selectedIndex].value;
addressField.readOnly = true;

priceField.placeholder = typeToMinPrice[defaultType];
createSlider(typeToMinPrice[defaultType], MAX_PRICE);


handlePrice(priceField);


const handleTypeChange = (evt) =>{
  priceField.placeholder = typeToMinPrice[evt.target.value];
  updateSliderValues(typeToMinPrice[evt.target.value], MAX_PRICE);
};

typeField.addEventListener('change', (evt)=>handleTypeChange(evt));

priceField.addEventListener('change', (evt)=>updateHandlePlace(evt.target.value));

const disableForm = ()=>{
  advertForm.classList.add('ad-form--disabled');
  fields.forEach((field)=>{
    field.disabled = true;
  });
  disableSlider();
  advertForm.reset();
};

const activateForm = ()=>{
  advertForm.classList.remove('ad-form--disabled');
  fields.forEach((field)=>{
    field.disabled = false;
  });
};

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorClass:'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});


const validateRoomsCapacity = ()=>{
  const rooms = +roomsField.value;
  const capacity = +capacityField.value;
  return capacity <= roomsMaxCapacity[rooms];

};

const getCapacityError = ()=>{
  const rooms = +roomsField.value;
  return roomsMaxCapacity[rooms] > 0
    ? `Количество не может превышать  ${roomsMaxCapacity[rooms]}`
    : 'Не предусмотрено для гостей';
};

const validatePrice = ()=>{
  const type = typeField.value;
  const price = +priceField.value;
  return price >= typeToMinPrice[type];
};

const getPriceError = ()=>{
  const type = typeField.value;
  const priceError = `Цена не может быть ниже ${typeToMinPrice[type]}`;
  return priceError;
};

pristine.addValidator(capacityField, validateRoomsCapacity, getCapacityError);
pristine.addValidator(priceField, validatePrice, getPriceError);

const setDefaultStatus = ()=>{
  updateHandlePlace(typeToMinPrice[typeField.value]);
  resetMap();
  resetFilters();
  priceField.placeholder = typeToMinPrice[defaultType];
};

advertForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  pristine.validate();
  setDefaultStatus();
});

advertForm.addEventListener('reset', ()=>{
  setDefaultStatus();

});

export {activateForm, disableForm};
