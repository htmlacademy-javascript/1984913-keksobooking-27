const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const avatarField = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoField = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const checkValidType = (item)=>FILE_TYPES.some((type)=>item.name.toLowerCase().endsWith(type));

avatarField.addEventListener('change', ()=>{
  const avatar = avatarField.files[0];
  const isValid = checkValidType(avatar);
  if(isValid){
    avatarPreview.src = URL.createObjectURL(avatar);
  }
});

const createPhotoElement = (file)=>{
  const photo = document.createElement('img');
  photo.src = URL.createObjectURL(file);
  photo.alt = 'Фотография жилья';
  photo.classList.add('ad-form__photo');
  return photo;
};

photoField.addEventListener('change', ()=>{
  const photo = photoField.files[0];
  const isValid = checkValidType(photo);
  if(isValid){
    photoPreview.appendChild(createPhotoElement(photo));
  }
});

const resetPhotoFields = ()=>{
  avatarPreview.src = '../img/muffin-grey.svg';
  photoPreview.querySelectorAll('img').forEach((photo)=>photo.remove());
};

export {
  resetPhotoFields
};
