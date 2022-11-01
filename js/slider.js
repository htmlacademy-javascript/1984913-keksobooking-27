const slider = document.querySelector('.ad-form__slider');

const createSlider = (min, max)=>{
  noUiSlider.create(slider,{
    range:{
      min:min,
      max:max
    },
    start:min,
    step:1,
    connect: 'lower',
    format:{
      to:(value)=>value.toFixed(0),
      from: (value)=>parseFloat(value).toFixed(0)
    }
  });
};

const handlePrice = (price) =>{
  slider.noUiSlider.on('update', ()=>{
    price.value = slider.noUiSlider.get();
  });
};

const updateHandlePlace = (value)=>{
  slider.noUiSlider.set(value);
};

const updateSliderValues = (min, max)=>{
  slider.noUiSlider.updateOptions({
    range:{
      min:min,
      max:max,
    }
  });
  updateHandlePlace(min);
};

const disableSlider = ()=>{
  slider.setAttribute('disabled', true);
};

export {createSlider,updateSliderValues,updateHandlePlace,handlePrice,disableSlider};
