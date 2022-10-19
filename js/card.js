import {createPropertyAdvertisements} from'./advertisements-data.js';

const PropertyType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const temporaryOfferBlock = document.querySelector('#map-canvas');
const advertisementTemplate = document.querySelector('#card').content
  .querySelector('.popup');

const renderFeatures = (container, offerFeatures)=>{
  const featuresContainer = container.querySelector('.popup__features');
  const defaultFeaturesList = featuresContainer.querySelectorAll('.popup__feature');

  defaultFeaturesList.forEach((defaultFeatureItem)=>{
    const isChecked = offerFeatures.some(
      (offerFeature)=>defaultFeatureItem.classList.contains(`popup__feature--${offerFeature}`));

    if(!isChecked){
      defaultFeatureItem.remove();
    }
  }
  );
};

const renderPhotos = (container, offerPhotos)=>{
  const photosContainer = container.querySelector('.popup__photos');
  if(offerPhotos){
    photosContainer.innerHTML = '';
    const photosFragment = document.createDocumentFragment();
    offerPhotos.map((photo)=>{
      const photoItem = document.createElement('img');
      photoItem.classList.add('.popup__photo');
      photoItem.src = photo;
      photoItem.alt = 'Фотография жилья';
      photoItem.width = 45;
      photoItem.height = 40 ;
      photosFragment.appendChild(photoItem);
    });
    photosContainer.appendChild(photosFragment);
  }else{
    photosContainer.classList.add('.hidden');
  }
};

const renderAdvertisements = ()=>{
  const propertyAdvertisementsFragment = document.createDocumentFragment();

  const propertyAdvertisements = createPropertyAdvertisements();

  propertyAdvertisements.forEach(({author, offer})=>{
    const advertisementItem = advertisementTemplate.cloneNode(true);
    advertisementItem.querySelector('.popup__title').textContent = offer.title;
    advertisementItem.querySelector('.popup__text--address').textContent = offer.address;
    advertisementItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    advertisementItem.querySelector('.popup__type').textContent = PropertyType[offer.type];
    advertisementItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    advertisementItem.querySelector('.popup__text--time').textContent = ` Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    advertisementItem.querySelector('.popup__description').textContent = offer.description;
    advertisementItem.querySelector('.popup__avatar').src = author.avatar;
    renderFeatures(advertisementItem, offer.features);
    renderPhotos(advertisementItem,offer.photos);
    propertyAdvertisementsFragment.appendChild(advertisementItem);
  });

  temporaryOfferBlock.appendChild(propertyAdvertisementsFragment.firstChild);
};

renderAdvertisements();
