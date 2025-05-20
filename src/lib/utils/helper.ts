export const formatDate = (
  date: string,
  time: string,
  durationInMinutes: number
): string => {
  const startDate = new Date(`${date} ${time}`);
  const endDate = new Date(startDate.getTime() + durationInMinutes * 60 * 1000);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatDatePart = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  return `${formatTime(startDate)} - ${formatTime(endDate)}, ${formatDatePart(
    startDate
  )}`;
};
