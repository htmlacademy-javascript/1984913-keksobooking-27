import { createCard } from './card.js';
import { handleFilterAdverts } from './map-filters.js';
const ADVERTISEMENTS_AMOUNT = 10;
const COORDINATES_DIGITS = 5;
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
addressField.defaultValue = `${TokyoCenter.LAT}, ${TokyoCenter.LNG}`;

const handleAddress = ({lat, lng})=>{
  addressField.value = `${lat}, ${lng}`;
};

const mainPin = L.marker({
  lat:TokyoCenter.LAT,
  lng: TokyoCenter.LNG
}, {
  draggable:true,
  icon:MAIN_PIN_ICON
});

const map = L.map('map-canvas');
let pinsLayer;

const createPinsLayer = ()=>{
  pinsLayer = L.layerGroup().addTo(map);
};

const setMapLoad = (cb) => {
  map.on('load', cb);
};

const renderMap = ()=>{
  map.setView({
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
};

const formatCoordinates = ({lat, lng})=>{
  const formatedLat = lat.toFixed(COORDINATES_DIGITS);
  const formatedLng = lng.toFixed(COORDINATES_DIGITS);
  return {lat:formatedLat, lng:formatedLng};
};

mainPin.on('move', (evt) => {
  const coordinates = formatCoordinates(evt.target.getLatLng());
  handleAddress(coordinates);
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
  pinsLayer.clearLayers();
  const filteredAdverts = handleFilterAdverts(adverts, ADVERTISEMENTS_AMOUNT);
  filteredAdverts.forEach((advert) => {
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
  map.closePopup();
  map.setView({
    lat:TokyoCenter.LAT,
    lng:TokyoCenter.LNG
  },ZOOM);
};

export {
  renderAdverts,
  renderMap,
  resetMap,
  setMapLoad
};
