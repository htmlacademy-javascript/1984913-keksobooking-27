const propertyTypeToName = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderFeatures = (container, features)=>{
  const defaultFeaturesList = container.querySelectorAll('.popup__feature');

  defaultFeaturesList.forEach((defaultFeatureItem)=>{
    const isChecked = features.some(
      (feature)=>defaultFeatureItem.classList.contains(`popup__feature--${feature}`));

    if(!isChecked){
      defaultFeatureItem.remove();
    }
  }
  );
};

const renderPhotos = (container, photos) => {
  const photoTemplate = container.querySelector('.popup__photo');
  container.innerHTML = '';
  photos.forEach((photo) => {
    const photoItem = photoTemplate.cloneNode(true);
    photoItem.src = photo;
    container.appendChild(photoItem);
  });
};

const removeEmptyField = (field)=>{
  field.remove();
};

const createCard = (advert) => {
  const author = advert.author;
  const {
    description = '',
    features = [],
    photos = [],
    ...offer
  } = advert.offer;

  const card = cardTemplate.cloneNode(true);
  const photosContainer = card.querySelector('.popup__photos');
  const featuresContainer = card.querySelector('.popup__features');
  const descriptionField = card.querySelector('.popup__description');

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = propertyTypeToName[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__avatar').src = author.avatar;

  if(features.length > 0){
    renderFeatures(card, features);
  }else{
    removeEmptyField(featuresContainer);
  }

  if(photos.length > 0){
    renderPhotos(photosContainer, photos);
  } else {
    removeEmptyField(photosContainer);
  }

  if(description){
    descriptionField.textContent = description;
  }else{
    removeEmptyField(descriptionField);
  }

  return card;
};

export {
  createCard
};
