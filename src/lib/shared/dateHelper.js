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

// Returns the last seven days in descending order in YYYY-MM-DD format
export function getLastSevenDays() {
  const today = new Date();
  const lastSevenDays = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0');
    const date = String(day.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${date}`;
    lastSevenDays.push(formattedDate);
  }

  return lastSevenDays;
}