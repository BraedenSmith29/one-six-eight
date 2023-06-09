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

// Converts from date string to an object containing details of the date
export function parseDateString(dateString) {
  let date = new Date(dateString + "T00:00"); // Add time to ensure use of local timezone
  
  let dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
  let day = date.getDate();
  let month = date.toLocaleString('en-US', { month: 'long' });
  let numericalMonth = date.getMonth() + 1; // Adding 1 to get the numerical month
  let year = date.getFullYear();
  
  return {
    dayOfWeek: dayOfWeek,
    day: day,
    month: month,
    numericalMonth: numericalMonth,
    year: year,
    dateString: dateString
  };
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

// Returns the difference in minutes between 2 times in YYYY-MM-DDTHH:MM format
export function computeTimeDifference(startTime, endTime) {
  let start = new Date(startTime);
  let end = new Date(endTime);
  
  let differenceInMilliseconds = end - start;
  let differenceInMinutes = Math.round(differenceInMilliseconds / (1000 * 60));
  
  return differenceInMinutes;
}

// Returns the amount of minutes since midnight from a time in YYYY-MM-DDTHH:MM format
export function computeMinutesSinceMidnight(dateTime, referenceDate) {
  let compareTime = new Date(dateTime);
  let referenceTime = new Date(referenceDate + "T00:00");

  let timeDifferenceMilliseconds = compareTime - referenceTime;
  let minutesSinceMidnight = Math.floor(timeDifferenceMilliseconds / (1000 * 60));

  return minutesSinceMidnight;
}

// Returns true if any part of the time range (format YYYY-MM-DDTHH:MM) is on the date (in YYYY-MM-DD)
export function eventOnDay(startTime, endTime, date) {
  let startDate = new Date(startTime);
  let endDate = new Date(endTime);
  let targetDate = new Date(date + "T00:00");

  // Set the time components of startDate and endDate to 00:00:00
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // Check if targetDate falls between startDate and endDate (inclusive)
  return targetDate >= startDate && targetDate <= endDate;
}

// Returns the difference between 2 times in YYYY-MM-DDTHH:MM format
// Positive if time1 is after time2
export function timeDifference(time1, time2) {
  let time1Date = new Date(time1);
  let time2Date = new Date(time2);

  let differenceMs = time1Date - time2Date;
  let differenceMin = differenceMs / 1000 / 60;

  return differenceMin;
}

// Takes a time string and shifts it by the specified amount of minutes
export function changeTimeByMinutes(timeString, minutes) {
  const date = new Date(timeString);
  date.setMinutes(date.getMinutes() + minutes);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const updatedMinutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${updatedMinutes}`;
}
