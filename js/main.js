const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }

  const rangeStart = min < max ? min : max;
  const rangeEnd = min < max ? max : min;

  const randomInteger = Math.floor(
    Math.random() * (rangeEnd - rangeStart + 1) + rangeStart
  );
  return randomInteger;
};

const getRandomFloat = (min, max, decimals) => {
  if (min < 0 || max < 0 || decimals < 0) {
    return NaN;
  }

  const rangeStart = min < max ? min : max;
  const rangeEnd = min < max ? max : min;

  const randomFloat = (
    Math.random() * (rangeEnd - rangeStart) +
    rangeStart
  ).toFixed(decimals);
  return +randomFloat;
};

getRandomInteger(1, 10);
getRandomFloat(1.1, 2.5, 3);
