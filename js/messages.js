const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
let currentMessage;
const showLoadError = (error)=>{
  const errorBlock = document.querySelector('.server-error');
  errorBlock.querySelector('.server-error__code').textContent = error;
  errorBlock.classList.remove('visually-hidden');
};

const closeMessageOnEscape = (evt)=>{
  if(evt.key === 'Escape'){
    currentMessage.remove();
  }
};

const closeMessageOnClick = ()=>{
  currentMessage.remove();
};

const closeMessage = (evt)=>{
  if(evt.type === 'click'){
    closeMessageOnClick();
  }else{
    closeMessageOnEscape(evt);
  }
  document.removeEventListener('click', closeMessage);
  document.removeEventListener('keydown', closeMessage);
};

const showFormMessage = (type)=>{
  currentMessage = type === 'error' ? errorMessage : successMessage;
  document.body.append(currentMessage);
  document.addEventListener('click', closeMessage);
  document.addEventListener('keydown', closeMessage);
  if(type === 'error'){
    document.querySelector('.error__button').addEventListener('click', closeMessage);
  }
};

const showServerError = (error, type )=>{
  if(type === 'loadData'){
    showLoadError(error);
  }else{
    showFormMessage('error');

  }
};

const showServerSucccess = ()=>{
  showFormMessage('success');
};

export {showServerError, showServerSucccess};

