const ADVERTISMENTS_AMOUNT = 10;
const AVATARS_AMOUNT = 10;
const PRICES = {min:0 , max:100000};
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const ROOMS_MAX_AMOUNT = 10;
const GUESTS_MAX_AMOUNT = 10;
const CHECKIN_HOURS = ['12:00','13:00', '14:00'];
const CHECKOUT_HOURS = ['12:00','13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const LOCATION_COORDINATES = {
  lat:{ min:35.65000 , max:35.70000},
  lng:{ min:139.70000 , max:139.80000}
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
  const latitude = getRandomPositiveFloat(coordinates.lat.min, coordinates.lat.max, 5);
  const longitude = getRandomPositiveFloat(coordinates.lng.min, coordinates.lng.max, 5);
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


const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomSelectionArray = (elements) => {
  const randomSelectionLength = getRandomPositiveInteger(1, elements.length);
  const randomSelectionArray = [];

  while (randomSelectionArray.length < randomSelectionLength) {
    const randomElementIndex = getRandomPositiveInteger(0, elements.length - 1);
    const randomElement = elements[randomElementIndex];

    if (!randomSelectionArray.includes(randomElement)) {
      randomSelectionArray.push(randomElement);
    }
  }
  return randomSelectionArray;
};

const getRandomOffer = (coordinates) =>({
  title:'Уютный дом',
  address:`${coordinates.lat }, ${ coordinates.lng}`,
  price: getRandomPositiveInteger(PRICES.min, PRICES.max),
  type: getRandomArrayElement(TYPES),
  rooms:getRandomPositiveInteger(1, ROOMS_MAX_AMOUNT),
  guests: getRandomPositiveInteger(1, GUESTS_MAX_AMOUNT),
  checkin:getRandomArrayElement(CHECKIN_HOURS),
  checkout:getRandomArrayElement(CHECKOUT_HOURS),
  features:getRandomSelectionArray(FEATURES),
  description:'Современный дизайн',
  photos:getRandomSelectionArray(PHOTOS),
});


const createAdvertisement = () => {
  const coordinates = getRandomCoordinates(LOCATION_COORDINATES);
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
