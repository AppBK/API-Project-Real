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

export const monetary = (price) => {
  let string = price.toString();
  let countFromEnd = 0;
  let num;
  let output = '';

  for (let i = string.length - 1; i >= 0; i--) {
    num = string[i];
    countFromEnd++;

    if (countFromEnd === 3 && i !== 0) {
      output = num + output;
      output = ',' + output;
      countFromEnd = 0;
    } else {
      output = num + output;
    }
  }

  return '$' + output;
}

export const diffDates = (d1, d2) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  let date1 = new Date(d1);
  let date2 = new Date(d2);

  let diff = Math.abs(date2 - date1);
  let diffDays = Math.ceil(diff / _MS_PER_DAY);

  return diffDays;
}
