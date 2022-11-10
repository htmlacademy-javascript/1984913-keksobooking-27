import { createCard } from './card.js';
const ADVERTISEMENTS_AMOUNT = 10;
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

};

const addressField = document.querySelector('#address');

const handleAddress = (lat, lng)=>{
  addressField.value = `${lat}, ${lng}`;
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
    handleAddress(TokyoCenter.LAT,TokyoCenter.LNG );
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

const formatCoordinates = ({lat, lng})=>{
  const formatedLat = lat.toFixed(5);
  const formatedLng = lng.toFixed(5);
  return {lat:formatedLat, lng:formatedLng};
};

mainPin.on('move', (evt) => {
  const coordinates = formatCoordinates(evt.target.getLatLng());
  handleAddress(coordinates.lat,coordinates.lng );
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
  adverts.slice(0,ADVERTISEMENTS_AMOUNT).forEach((advert) => {
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
