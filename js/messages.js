const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const loadError = document.querySelector('.load-error');
let currentMessage;

const showLoadError = (error)=>{
  loadError.querySelector('.load-error__code').textContent = error;
  loadError.classList.remove('visually-hidden');
};

const closeMessage = ()=>{
  currentMessage.remove();
  // document.removeEventListener('click', onMessageClick);
  // document.removeEventListener('keydown', onMessageEscKeydown);
};

const onMessageClick = ()=>{
  closeMessage();
};

const onMessageEscKeydown = (evt)=>{
  if(evt.key === 'Escape'){
    closeMessage();
  }
};

const onErrorButtonClick = ()=>{
  closeMessage();
};

const showFormMessage = (type)=>{
  currentMessage = type === 'error' ? errorMessage : successMessage;
  document.body.append(currentMessage);
  document.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  if(type === 'error'){
    document.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  }
};

const showServerError = (error, type)=>{
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

