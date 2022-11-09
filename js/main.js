import {renderAdverts, renderMap, resetMap} from'./map.js';
import { activateForm, disableForm,handleResetForm, setFormSubmit, setFormReset } from './form.js';
import { activateFilters, disableFilters, resetFilters } from './map-filters.js';
import {getData} from './server.js';
import { showServerError } from './messages.js';

const createAdverts = getData((adverts)=>{
  renderAdverts(adverts);
  activateFilters();
},
showServerError);

disableForm();
disableFilters();

const mapLoaded = renderMap();

const handleActiveState = (status)=>{
  if(status){
    activateForm();
    createAdverts(); }
};

const setDefaultStatus = ()=>{
  handleResetForm();
  resetMap();
  resetFilters();
};

setFormSubmit(setDefaultStatus);
setFormReset(setDefaultStatus);

handleActiveState(mapLoaded);


