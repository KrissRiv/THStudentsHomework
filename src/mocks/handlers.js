import { http, HttpResponse } from "msw";

import { constants } from "../utils/constants";
import { mockData } from "./mockData";

export const handlers = [
  http.get(constants.API_SERVICE_URL, () => {
    return HttpResponse.json(mockData, { status: 200 });
  })
];
