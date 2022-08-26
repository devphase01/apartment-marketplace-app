export const formatPrice = (price) => {
  return new Intl.NumberFormat("ua-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: false
  }).format(price).split(",").join(" ").replace("UAH", "").trim();
}


  // 1, 21, 31, 41, 51..      => кімната
 // 2-4, 22-24, 32-34..      => кіманти
// 0, 5-20, 25-30, 35-40..  => кімнат
export const formatRooms = (rooms) => {
  const stringVersion = String(rooms);

  if(["5", "6", "7", "8", "9"].includes(stringVersion.slice(-1)) || rooms % 10 === 0 || rooms === 11) {
    return `${rooms} кімнат`
  } 

  if(stringVersion.slice(-1) === "1") {
    return `${rooms} кімната`
  }

  if(["2", "3", "4"].includes(stringVersion.slice(-1))) {
    return `${rooms} кіманти`
  }
}

export const formatSuggestions = (suggestions) => {
  const stringVersion = String(suggestions);

  if(["5", "6", "7", "8", "9"].includes(stringVersion.slice(-1)) || suggestions % 10 === 0 || suggestions === 11) {
    return `${suggestions} пропозицій`
  } 

  if(stringVersion.slice(-1) === "1") {
    return `${suggestions} пропозиція`
  }

  if(["2", "3", "4"].includes(stringVersion.slice(-1))) {
    return `${suggestions} пропозиції`
  }
}