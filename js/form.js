const advertForm = document.querySelector('.ad-form');
const fields = advertForm.querySelectorAll('fieldset');
const addressField = advertForm.querySelector('#address');

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


export {activateForm, disableForm};
