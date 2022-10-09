const ADVERTISMENTS_AMOUNT = 10;
const AVATARS_AMOUNT = 10;
const Prices = {MIN:0 , MAX:100000};
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const ROOMS_MAX_AMOUNT = 10;
const GUESTS_MAX_AMOUNT = 10;
const CHECKIN_HOURS = ['12:00','13:00', '14:00'];
const CHECKOUT_HOURS = ['12:00','13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const LocationCoordinates = {
  LAT:{ MIN:35.65000 , MAX:35.70000},
  LNG:{ MIN:139.70000 , MAX:139.80000}
};
const freeAvatars = [];

const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }

  const rangeStart = Math.ceil( min < max ? min : max);
  const rangeEnd = Math.floor(min < max ? max : min);

  const randomPositiveInteger = Math.floor(
    Math.random() * (rangeEnd - rangeStart + 1) + rangeStart
  );
  return randomPositiveInteger;
};

const getRandomPositiveFloat = (min, max, decimals) => {
  if (min < 0 || max < 0 || decimals < 0) {
    return NaN;
  }

  const rangeStart = min < max ? min : max;
  const rangeEnd = min < max ? max : min;

  const randomPositiveFloat = (
    Math.random() * (rangeEnd - rangeStart) +
    rangeStart
  ).toFixed(decimals);
  return +randomPositiveFloat;
};

const getRandomCoordinates = (coordinates) => {
  const latitude = getRandomPositiveFloat(coordinates.LAT.MIN, coordinates.LAT.MAX, 5);
  const longitude = getRandomPositiveFloat(coordinates.LNG.MIN, coordinates.LNG.MAX, 5);
  return {lat:latitude, lng:longitude};
};

const getRandomUniqueAvatar = (max) => {

  if (freeAvatars.length === 0) {
    for (let i = 0; i < max; i++) {
      const start = 1;
      freeAvatars.push(start + i);
    }
  }
  const randomIndex = getRandomPositiveInteger(1,freeAvatars.length - 1);
  let avatarIndex = freeAvatars[randomIndex];

  if(avatarIndex < 10) {
    avatarIndex = `0${avatarIndex}`;
  }

  const avatarSource = `img/avatars/user${avatarIndex}.png`;
  freeAvatars.splice(randomIndex, 1);
  return avatarSource;
};

const getRandomArrayItem = (items) => items[getRandomPositiveInteger(0, items.length - 1)];

const getRandomSelectionItems = (items) => {
  const randomSelectionLength = getRandomPositiveInteger(1, items.length);
  const randomSelectionItems = [];

  while (randomSelectionItems.length < randomSelectionLength) {
    const randomItemIndex = getRandomPositiveInteger(0, items.length - 1);
    const randomItem = items[randomItemIndex];

    if (!randomSelectionItems.includes(randomItem)) {
      randomSelectionItems.push(randomItem);
    }
  }
  return randomSelectionItems;
};

const getRandomOffer = (coordinates) =>({
  title:'Уютный дом',
  address:`${coordinates.lat }, ${ coordinates.lng}`,
  price: getRandomPositiveInteger(Prices.MIN, Prices.MAX),
  type: getRandomArrayItem(TYPES),
  rooms:getRandomPositiveInteger(1, ROOMS_MAX_AMOUNT),
  guests: getRandomPositiveInteger(1, GUESTS_MAX_AMOUNT),
  checkin:getRandomArrayItem(CHECKIN_HOURS),
  checkout:getRandomArrayItem(CHECKOUT_HOURS),
  features:getRandomSelectionItems(FEATURES),
  description:'Современный дизайн',
  photos:getRandomSelectionItems(PHOTOS),
});


const createAdvertisement = () => {
  const coordinates = getRandomCoordinates(LocationCoordinates);
  return {
    author:{
      avatar:`${getRandomUniqueAvatar(AVATARS_AMOUNT)}`
    },
    offer:getRandomOffer(coordinates),
    location:coordinates,
  };
};

const propertyAdvertisements = Array.from({length:ADVERTISMENTS_AMOUNT}, createAdvertisement);

// eslint-disable-next-line no-console
console.log(propertyAdvertisements);
