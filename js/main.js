import {createAdverts} from'./advertisements-data.js';
import {renderAdverts} from'./map.js';

import { activateFilters, disableFilters } from './map-filters.js';
import { activateForm, disableForm } from './form.js';

const isLoaded = true;
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

