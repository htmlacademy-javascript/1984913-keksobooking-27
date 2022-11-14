const TIMEOUT_DELAY = 500;

const setDisabled = (element)=>{
  element.disabled = true;
};

const unsetDisabled = (element)=>{
  element.disabled = false;
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
  unsetDisabled
};
