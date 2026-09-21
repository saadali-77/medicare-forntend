export const formatDateTime = (value?: string) =>
  value
    ? new Date(value).toLocaleString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "—";

export const toAppointmentDate = (date: string, time: string) => {
  const match = time.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/);
  const [year, month, day] = date.split("-").map(Number);

  let hours = match ? Number(match[1]) % 12 : 0;
  const minutes = match ? Number(match[2]) : 0;
  if (match?.[3] === "PM") hours += 12;

  return new Date(year, month - 1, day, hours, minutes).toISOString();
};
