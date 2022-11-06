import { activateFilters } from './map-filters.js';
import {showServerError, showServerSucccess, closeMessageOnClick, closeMessageOnEscape} from'./messages.js';
const ADVERTISMENTS_AMOUNT = 10;


const getData = (onSuccess, onError) =>()=>{
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response)=>{
      if(response.ok){
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data)=>{
      onSuccess(data.slice(0, ADVERTISMENTS_AMOUNT));
      activateFilters();
    })
    .catch((err)=>{
      onError(err.message, 'loadData');
    });
};

const sendForm = (data, onSuccess)=>{
  fetch('https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    }
  ).then((response)=>{
    if(response.ok){
      onSuccess();
      showServerSucccess();
      document.addEventListener('click', ()=>closeMessageOnClick());
      document.addEventListener('keydown', ()=>closeMessageOnEscape());

    }else{
      throw new Error(`${response.status} ${response.statusText}`);}
  })
    .catch((err)=>{
      showServerError(err.message, 'sendForm');
      document.addEventListener('click', ()=>closeMessageOnClick());
      document.addEventListener('keydown', ()=>closeMessageOnEscape());
    });

};

export {getData, sendForm};

