const filtersForm = document.querySelector('.map__filters');
const filters = filtersForm.querySelectorAll('fieldset, select');

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


export {resetFilters, activateFilters, disableFilters};
