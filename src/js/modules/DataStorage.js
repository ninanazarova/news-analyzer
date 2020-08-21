export class DataStorage {
  update = (querystring, data) => {
    localStorage.setItem("querystring", querystring.trim());
    localStorage.setItem("news", JSON.stringify(data));
  };

  getChunk = (chunkNumber) => {
    const news = JSON.parse(localStorage.getItem("news")).articles;

    const chunkSize = 3;
    let chunksArray = [];
    for (let i = 0; i < Math.ceil(news.length / chunkSize); i++) {
      chunksArray[i] = news.slice(i * chunkSize, i * chunkSize + chunkSize);
    }

    return chunksArray[chunkNumber];
  };

  getQueryString = () => {
    return localStorage["querystring"];
  };

  getNews = () => {
    return JSON.parse(localStorage.getItem("news"));
  };
}
