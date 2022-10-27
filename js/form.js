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
const roomsField = advertForm.querySelector('#room_number');
const capacityField = advertForm.querySelector('#capacity');
const typeField = advertForm.querySelector('#type');
const priceField = advertForm.querySelector('#price');


addressField.readOnly = true;

const disableForm = ()=>{
  advertForm.classList.add('ad-form--disabled');
  fields.forEach((field)=>{
    field.disabled = true;
  });
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
  const roomsNumber = roomsField.value;
  const capacityNumber = capacityField.value;
  const isValid = capacityNumber <= roomsMaxCapacity[roomsNumber];
  return isValid;
};

const getCapacityError = ()=>{
  const roomsNumber = roomsField.value;
  const capacityError = roomsMaxCapacity[roomsNumber] !== 0 ? `Количество не может превышать
  ${roomsMaxCapacity[roomsNumber]}` : 'Не предусмотрено для гостей';
  return capacityError;
};

const validatePrice = ()=>{
  const type = typeField.value;
  const price = priceField.value;
  const isValid = price >= typeToMinPrice[type];
  return isValid;
};

const getPriceError = ()=>{
  const type = typeField.value;
  const priceError = `Цена не может быть ниже ${typeToMinPrice[type]}`;
  return priceError;
};

pristine.addValidator(capacityField, validateRoomsCapacity, getCapacityError);
pristine.addValidator(priceField, validatePrice, getPriceError);

advertForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  pristine.validate();
});

export {activateForm, disableForm};
