const advertForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const handleFormFieldsStatus = (formName, status)=>{
  const fields = formName.querySelectorAll('fieldset, select');
  fields.forEach((field)=>{
    if(status){
      field.setAttribute('disabled', 'disabled');
    }else{
      field.removeAttribute('disabled');
    }
  });
};

const disableForm = ()=>{
  advertForm.classList.add('ad-form--disabled');
  handleFormFieldsStatus(advertForm, true);
  mapFiltersForm.classList.add('map__filters--disabled');
  handleFormFieldsStatus(mapFiltersForm, true);

};

const activateForm = ()=>{
  advertForm.classList.remove('ad-form--disabled');
  handleFormFieldsStatus(advertForm, false);
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
