export class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  getNews = (querystring) => {
    return fetch(
      `${this.baseUrl}?q=${querystring}&apiKey=${this.apiKey}&from=2020-08-03&to="2020-08-10&pageSize=100`
    ).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    });
  };
}
