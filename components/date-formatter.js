import { parseISO, format } from "date-fns";
import { it } from "date-fns/locale";

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "d LLLL yyyy", { locale: it })}
    </time>
  );
}
