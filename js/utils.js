const TIMEOUT_DELAY = 500;

const setDisabled = (element)=>{
  element.disabled = true;
};

const unsetDisabled = (element)=>{
  element.disabled = false;
};

const removeElement = (element) =>{
  element.remove();
};

const debounce = (callback) =>{
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, TIMEOUT_DELAY, ...rest);
  };
};

export{
  debounce,
  setDisabled,
  unsetDisabled,
  removeElement
};
