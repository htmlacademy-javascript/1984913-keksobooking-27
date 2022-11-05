/* eslint-disable no-console */
import {renderAdverts, renderMap} from'./map.js';
import { activateForm, disableForm } from './form.js';
import { activateFilters, disableFilters } from './map-filters.js';
import {getData} from './server.js';

const createAdverts = getData(renderAdverts, console.error);

disableForm();
disableFilters();

const mapLoaded = renderMap();

const handleActiveState = (status)=>{
  if(status){
    activateForm();
    activateFilters();
    createAdverts(); }
};

handleActiveState(mapLoaded);


