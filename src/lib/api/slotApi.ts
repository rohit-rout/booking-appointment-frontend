import { getData } from "../service/fetcher";

export async function fetchSlots(date: string, timezone: string) {
  return await getData(
    `http://localhost:8080/api/slots?date=${date}&timezone=${timezone}`
  );
}
