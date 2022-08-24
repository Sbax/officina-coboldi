import { parseISO, format } from "date-fns";
import { it } from "date-fns/locale";

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString);
  const day = format(date, "eeee", { locale: it });
  return (
    <time dateTime={dateString}>
      {day.charAt(0).toUpperCase()}
      {day.slice(1)} {format(date, "d LLLL", { locale: it })}
    </time>
  );
}
