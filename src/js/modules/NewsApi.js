import { normalizedFrom, normalizedTo } from "../utils/date.js";
import {
  NEWS_API_KEY,
  NEWS_API_URL,
  NEWS_PAGE_SIZE,
} from "../constants/constants.js";

export class NewsApi {
  constructor() {}

  getNews = (querystring) => {
    return fetch(
      `${NEWS_API_URL}?q=${querystring}&apiKey=${NEWS_API_KEY}&from=${normalizedFrom}&to=${normalizedTo}&pageSize=${NEWS_PAGE_SIZE}`
    ).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    });
  };
}
