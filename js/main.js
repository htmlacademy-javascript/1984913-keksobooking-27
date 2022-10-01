function getIntegerNum(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }

  const startNum = min < max ? min : max;
  const endNum = min < max ? max : min;

  const resNum = Math.floor(Math.random() * (endNum - startNum + 1) + startNum);
  return resNum;
}

function getFloatNum(min, max, decimals) {
  if (min < 0 || max < 0 || decimals < 0) {
    return NaN;
  }

  const startNum = min < max ? min : max;
  const endNum = min < max ? max : min;

  const resNum = (Math.random() * (endNum - startNum) + startNum).toFixed(
    decimals
  );
  return +resNum;
}

getIntegerNum(1, 10);
getFloatNum(1.1, 2.5, 3);
