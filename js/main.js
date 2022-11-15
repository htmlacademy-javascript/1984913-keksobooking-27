import {renderAdverts, renderMap, resetMap, setMapLoad} from'./map.js';
import { activateForm, disableForm,handleResetForm, setFormSubmit, setFormReset } from './form.js';
import { activateFilters, disableFilters, resetFilters, setFilterChange } from './map-filters.js';
import {getData} from './server.js';
import { showServerError } from './messages.js';
import { debounce } from './utils.js';

const createAdverts = getData((adverts)=>{
  renderAdverts(adverts);
  activateFilters();
  setFilterChange(debounce(()=>renderAdverts(adverts)));
},
showServerError);

const initPage = ()=>{
  disableForm();
  disableFilters();
  renderMap();
};

const handleActiveState = ()=>{
  activateForm();
  createAdverts();
};

setMapLoad (()=>{
  handleActiveState();
});

const setDefaultStatus = ()=>{
  handleResetForm();
  resetMap();
  resetFilters();
};

setFormSubmit(setDefaultStatus);
setFormReset(setDefaultStatus);

initPage();
