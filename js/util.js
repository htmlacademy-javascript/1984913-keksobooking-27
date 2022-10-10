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

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayItem, getRandomSelectionItems };
