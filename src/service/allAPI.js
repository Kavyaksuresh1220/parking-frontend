import baseUrl from "./baseUrl";
import commonAPI from "./commonAPI";

// addTicket
export const addTicketAPI = async (ticket) => {
  return await commonAPI("POST", `${baseUrl}/ticket`, ticket);
};
