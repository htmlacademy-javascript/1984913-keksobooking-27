const advertisementForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const handleFormFieldsStatus = (formName, status)=>{
  const formFields = formName.querySelectorAll('fieldset, select');
  formFields.forEach((formField)=>{
    if(status){
      formField.setAttribute('disabled', 'disabled');
    }else{
      formField.removeAttribute('disabled');
    }
  });
};

const disableForm = ()=>{
  advertisementForm.classList.add('ad-form--disabled');
  handleFormFieldsStatus(advertisementForm, true);
  mapFiltersForm.classList.add('map__filters--disabled');
  handleFormFieldsStatus(mapFiltersForm, true);

};

const activateForm = ()=>{
  advertisementForm.classList.remove('ad-form--disabled');
  handleFormFieldsStatus(advertisementForm, false);
  mapFiltersForm.classList.remove('map__filters--disabled');
  handleFormFieldsStatus(mapFiltersForm, false);
};

const handleFormState = (value)=>{
  if(!value){
    disableForm();
  }else{
    activateForm();
  }

};

export {handleFormState};
