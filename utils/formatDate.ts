export const formatDate = (dateString: string): string => {
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

  if (comparedDate.getTime() === currentDate.getTime()) {
    return `Today at ${time}`;
  }

  if (comparedDate.getTime() === tomorrow.getTime()) {
    return `Tomorrow at ${time}`;
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const weekday = weekdays[date.getDay()];

  return `${weekday}, ${day}/${month} - ${time}h`;
};
