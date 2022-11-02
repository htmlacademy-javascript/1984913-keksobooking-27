import {createAdverts} from'./advertisements-data.js';
import {renderAdverts, renderMap} from'./map.js';
import { activateForm, disableForm } from './form.js';
import { activateFilters, disableFilters } from './map-filters.js';

const adverts = createAdverts();
disableForm();
disableFilters();

const mapLoaded = renderMap();

const handleActiveState = (status)=>{
  if(status){
    activateForm();
    activateFilters();
    renderAdverts(adverts);}
};

handleActiveState(mapLoaded);


