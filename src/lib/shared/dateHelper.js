// Converts a date from YYYY-MM-DD to MMM DD format
export function convertDateFormat(dateString) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const [_, month, day] = dateString.split('-');
  const monthIndex = parseInt(month, 10) - 1;
  const formattedDate = `${months[monthIndex]} ${parseInt(day, 10)}`;

  return formattedDate;
}

export function getCurrentDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

// Returns an array of dayCount days in YYYY-MM-DD format where index is the index of today
export function getArrayOfDays(dayCount, index = 0) {
  let dates = [];
  let firstDay = new Date();
  firstDay.setDate(firstDay.getDate() - index);

  for (let i = 0; i < dayCount; i++) {
    let nextDay = new Date(firstDay.getTime() + i * 24 * 60 * 60 * 1000);
    let year = nextDay.getFullYear();
    let month = String(nextDay.getMonth() + 1).padStart(2, '0');
    let day = String(nextDay.getDate()).padStart(2, '0');
    let formattedDate = year + '-' + month + '-' + day;
    dates.push(formattedDate);
  }

  return dates;
}

// Returns the last seven days in descending order in YYYY-MM-DD format
export function getLastSevenDays() {
  return getArrayOfDays(7, 6).reverse();
}