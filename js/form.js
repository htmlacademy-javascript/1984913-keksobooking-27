const advertForm = document.querySelector('.ad-form');
const fields = advertForm.querySelectorAll('fieldset');

const disableForm = ()=>{
  advertForm.classList.add('ad-form--disabled');
  fields.forEach((field)=>{
    field.setAttribute('disabled', 'true');
  });
};

const activateForm = ()=>{
  advertForm.classList.remove('ad-form--disabled');
  fields.forEach((field)=>{
    field.removeAttribute('disabled');
  });
};


export {activateForm, disableForm};
