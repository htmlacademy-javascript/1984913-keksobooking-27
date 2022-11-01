import { createCard } from './card.js';

const coordinates = {
  lat:35.66565,
  lng: 139.76102,
  toString: function() {
    return `lat:${this.lat}, lng:${this.lng}`;
  }
};
const addressField = document.querySelector('#address');
let isLoaded = false;

const handleAddress = ()=>{
  addressField.defaultValue = coordinates.toString();
};

const map = L.map('map-canvas').on('load',()=>{
  isLoaded = true;
  handleAddress();
}).setView({
  lat:35.66565,
  lng: 139.76102
},15);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl:'../img/main-pin.svg',
  iconSize:[52,52],
  iconAnchor:[26,52],
});

const pinIcon = L.icon({
  iconUrl:'../img/pin.svg',
  iconSize:[40,40],
  iconAnchor:[20,40],
});

const mainPin = L.marker({
  lat:35.66565,
  lng: 139.76102
}, {
  draggable:true,
  icon:mainPinIcon
});

mainPin.addTo(map);

const setCoordinates = (val)=>{
  coordinates.lat = val.lat.toFixed(5);
  coordinates.lng = val.lng.toFixed(5);
};

mainPin.on('moveend', (evt) => {
  setCoordinates(evt.target.getLatLng());
  addressField.value = coordinates.toString();

});

const pinsLayer = L.layerGroup().addTo(map);

const createPin = (lat, lng, card)=>{
  const pin = L.marker({
    lat,
    lng
  },{
    icon:pinIcon
  });
  pin.addTo(pinsLayer).bindPopup(card);
};

const renderAdverts = (adverts) => {
  const cards = [];
  adverts.forEach((advert) => {
    const card = createCard(advert);
    cards.push(card);
    const {lat, lng} = advert.location;
    createPin(lat, lng, card);
  });
};

const resetMap = ()=>{
  mainPin.setLatLng({
    lat:35.66565,
    lng: 139.76102
  });
  map.closePopup();
  map.on('load', ()=>{handleAddress();}).setView({
    lat:35.66565,
    lng: 139.76102
  },15);
};

export {
  renderAdverts,
  isLoaded,
  resetMap
};

