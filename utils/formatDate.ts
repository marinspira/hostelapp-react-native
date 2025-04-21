export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();

  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);

  const comparedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const weekday = weekdays[date.getDay()];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const isToday = comparedDate.getTime() === currentDate.getTime();
  const isTomorrow = comparedDate.getTime() === tomorrow.getTime();

  return {
    time,
    weekday,
    day,
    month,
    year,
    isToday,
    isTomorrow,
    fullString: isToday
      ? `Today at ${time}`
      : isTomorrow
      ? `Tomorrow at ${time}`
      : `${weekday}, ${day} ${month} - ${time}h`,
  };
};
