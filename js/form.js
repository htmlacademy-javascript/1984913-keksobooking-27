const advertForm = document.querySelector('.ad-form');
const fields = advertForm.querySelectorAll('fieldset');
const addressField = advertForm.querySelector('#address');
const roomsNumberToGuests = {
  1: 1,
  2: 2,
  3: 3,
  100: 0
};
const roomsField = advertForm.querySelector('#room_number');
const capacityField = advertForm.querySelector('#capacity');


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
  const isValid = capacityNumber <= roomsNumberToGuests[roomsNumber];
  return isValid;
};

const getCapacityError = ()=>{
  const roomsNumber = roomsField.value;
  const capacityError = roomsNumberToGuests[roomsNumber] !== 0 ? `Количество не может превышать
  ${roomsNumberToGuests[roomsNumber]}` : 'Не предусмотрено для гостей';
  return capacityError;
};

pristine.addValidator(capacityField, validateRoomsCapacity, getCapacityError);


advertForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  pristine.validate();
});

export {activateForm, disableForm};
