const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() + 1 === today.getMonth() + 1 &&
    someDate.getFullYear() === today.getFullYear()
  );
};
const isYesterday = (someDate: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    someDate.getDate() === yesterday.getDate() &&
    someDate.getMonth() + 1 === yesterday.getMonth() + 1 &&
    someDate.getFullYear() === yesterday.getFullYear()
  );
};

export { isToday, isYesterday };
