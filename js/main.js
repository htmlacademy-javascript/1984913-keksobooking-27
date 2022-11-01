import {createAdverts} from'./advertisements-data.js';
import {renderAdverts, isLoaded} from'./map.js';
import { activateForm, disableForm } from './form.js';
import { activateFilters, disableFilters } from './map-filters.js';

const adverts = createAdverts();

const handlePageState = (status)=>{
  if(!status){
    disableForm();
    disableFilters();
  }else{
    activateForm();
    activateFilters();
    renderAdverts(adverts);
  }
};

handlePageState(isLoaded);

