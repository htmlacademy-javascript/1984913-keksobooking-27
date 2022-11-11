const DELAY = 500;

const disableItem = (item)=>{
  item.disabled = true;
};

const enableItem = (item)=>{
  item.disabled = false;
};

const debounce = (callback) =>{
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), DELAY);
  };
};

export{
  debounce,
  disableItem,
  enableItem
};
