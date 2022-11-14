export const subPixels = (current, add) => {
  let numeric = '';
  for (let i = 0; i < current.length; i++) {
    if ((current[i] >= '0' && current[i] <= '9') || current[i] === '-') {
      numeric += current[i];
    }
  }

  const newValue = (+numeric - add) + 'px';

  return newValue;
}

export const addPixels = (current, add) => {
  let numeric = '';
  for (let i = 0; i < current.length; i++) {
    if ((current[i] >= '0' && current[i] <= '9') || current[i] === '-') {
      numeric += current[i];
    }
  }

  const newValue = (+numeric + add) + 'px';

  return newValue;
}
