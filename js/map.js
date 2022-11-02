import { createCard } from './card.js';

const MAIN_PIN_ICON = L.icon({
  iconUrl:'../img/main-pin.svg',
  iconSize:[52,52],
  iconAnchor:[26,52],
});
const PIN_ICON = L.icon({
  iconUrl:'../img/pin.svg',
  iconSize:[40,40],
  iconAnchor:[20,40],
});
const ZOOM = 15;
const TokyoCenter = {
  LAT:35.66565,
  LNG:139.76102,
  toString(){
    return`${this.LAT}, ${this.LNG}`;
  },
};
const coordinates = Object.assign({}, TokyoCenter);

const addressField = document.querySelector('#address');

const handleAddress = ()=>{
  addressField.value = coordinates.toString();
};

const mainPin = L.marker({
  lat:TokyoCenter.LAT,
  lng: TokyoCenter.LNG
}, {
  draggable:true,
  icon:MAIN_PIN_ICON
});

let map;
let pinsLayer;

const createPinsLayer = ()=>{
  pinsLayer = L.layerGroup().addTo(map);
};

const renderMap = ()=>{
  map = L.map('map-canvas').on('load',()=>{
    handleAddress();
  }).setView({
    lat:TokyoCenter.LAT,
    lng:TokyoCenter.LNG
  },ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPin.addTo(map);
  createPinsLayer();
  return map['_loaded'] || false;
};


const setCoordinates = (value)=>{
  coordinates.LAT = value.lat.toFixed(5);
  coordinates.LNG = value.lng.toFixed(5);
};


mainPin.on('move', (evt) => {
  setCoordinates(evt.target.getLatLng());
  addressField.value = coordinates.toString();
});

const createPin = (lat, lng, card)=>{
  const pin = L.marker({
    lat,
    lng
  },{
    icon:PIN_ICON
  });
  pin.addTo(pinsLayer).bindPopup(card);
};

const renderAdverts = (adverts) => {
  adverts.forEach((advert) => {
    const card = createCard(advert);
    const {lat, lng} = advert.location;
    createPin(lat, lng, card);
  });
};

const resetMap = ()=>{
  mainPin.setLatLng({
    lat:TokyoCenter.LAT,
    lng:TokyoCenter.LNG
  });
  if(map){
    map.closePopup();
    map.setView({
      lat:TokyoCenter.LAT,
      lng:TokyoCenter.LNG
    },ZOOM);}
};

export {
  renderAdverts,
  renderMap,
  resetMap
};
