const slider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');


const createSlider = (min, max)=>{
  noUiSlider.create(slider,{
    range:{
      min,
      max
    },
    start:min,
    step:1,
    connect: 'lower',
    format:{
      to(value){
        return value.toFixed(0);
      },
      from(value){
        return parseFloat(value).toFixed(0);
      }
    }
  });

  slider.noUiSlider.on('slide', ()=>{
    priceField.value = slider.noUiSlider.get();
  });
};

const updateHandlePlace = (value)=>{
  slider.noUiSlider.set(value);
};

const updateSliderValues = (min,max)=>{
  slider.noUiSlider.updateOptions({
    range:{
      min:min,
      max:max,
    }
  });
  updateHandlePlace(min);
};

const disableSlider = ()=>{
  //  Перевод в неактивное состояние по noUiSlider документации
  slider.setAttribute('disabled', true);
};


export {createSlider,updateSliderValues,updateHandlePlace,disableSlider};

