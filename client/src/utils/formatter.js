export const formatPrice = (price) => new Intl.NumberFormat('ua-UA', {
  style: 'currency',
  currency: 'UAH',
  minimumFractionDigits: false,
}).format(price).split(',').join(' ')
  .replace('UAH', '')
  .trim();

// 1, 21, 31, 41, 51..      => кімната
// 2-4, 22-24, 32-34..      => кіманти
// 0, 5-20, 25-30, 35-40..  => кімнат
export const formatRooms = (rooms) => {
  const strRooms = String(rooms);

  const singleRule = rooms % 10 === 0 || rooms === 11;

  if (['5', '6', '7', '8', '9'].includes(strRooms.slice(-1)) || singleRule) {
    return `${rooms} кімнат`;
  }

  if (strRooms.slice(-1) === '1') {
    return `${rooms} кімната`;
  }

  if (['2', '3', '4'].includes(strRooms.slice(-1))) {
    return `${rooms} кіманти`;
  }

  return `${rooms} кімнат`;
};

export const formatSuggestions = (suggestions) => {
  const strRooms = String(suggestions);

  const ruleSingle = suggestions % 10 === 0 || suggestions === 11;

  if (['5', '6', '7', '8', '9'].includes(strRooms.slice(-1)) || ruleSingle) {
    return `${suggestions} пропозицій`;
  }

  if (strRooms.slice(-1) === '1') {
    return `${suggestions} пропозиція`;
  }

  if (['2', '3', '4'].includes(strRooms.slice(-1))) {
    return `${suggestions} пропозиції`;
  }

  return `${suggestions} пропозицій`;
};
