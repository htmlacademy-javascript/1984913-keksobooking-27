const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
let currentMessage;
const showLoadError = (error)=>{
  const errorBlock = document.querySelector('.server-error');
  errorBlock.querySelector('.server-error__code').textContent = error;
  errorBlock.classList.remove('visually-hidden');
};

// document.removeEventListener('keydown', ()=>closeMessageOnEscape());
// document.removeEventListener('click', ()=>closeMessageOnClick());

const closeMessageOnEscape = ()=>{
  currentMessage.remove();
};

const closeMessageOnClick = ()=>{
  currentMessage.remove();
};

const showFormMessage = (type)=>{
  currentMessage = type === 'error' ? errorMessage : successMessage;
  document.body.append(currentMessage);
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

export {showServerError, showServerSucccess, closeMessageOnClick, closeMessageOnEscape};

