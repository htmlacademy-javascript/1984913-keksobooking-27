const LOAD_DATA_ADDRESS = 'https://27.javascript.pages.academy/keksobooking/data';
const SEND_FORM_ADDRESS = 'https://27.javascript.pages.academy/keksobooking/';

const getData = (onSuccess, onError) =>()=>{
  fetch(LOAD_DATA_ADDRESS)
    .then((response)=>{
      if(response.ok){
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data)=>{
      onSuccess(data);
    })
    .catch((err)=>{
      onError(err.message, 'loadData');
    });
};

const sendForm = (data, onSuccess, onError)=>{
  fetch(SEND_FORM_ADDRESS,
    {
      method: 'POST',
      body: data,
    }
  ).then((response)=>{
    if(response.ok){
      onSuccess();
    }else{
      throw new Error(`${response.status} ${response.statusText}`);}
  })
    .catch((err)=>{
      onError(err);
    });
};

export {getData, sendForm};

