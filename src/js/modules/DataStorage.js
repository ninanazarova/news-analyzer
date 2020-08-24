export class DataStorage {
  update = (querystring, data) => {
    localStorage.setItem("querystring", querystring.trim());
    localStorage.setItem("news", JSON.stringify(data));
  };

  getQueryString = () => {
    return localStorage["querystring"];
  };

  getNews = () => {
    return JSON.parse(localStorage.getItem("news"));
  };

  getChunk = (chunkNumber) => {
    const chunksArray = this.makeChunksArray();
    return chunksArray[chunkNumber];
  };

  getChunksAmount = () => {
    return this.makeChunksArray().length;
  };

  makeChunksArray = () => {
    const news = this.getNews().articles;

    const chunkSize = 3;
    const chunksArray = [];
    for (let i = 0; i < Math.ceil(news.length / chunkSize); i++) {
      chunksArray[i] = news.slice(i * chunkSize, i * chunkSize + chunkSize);
    }

    return chunksArray;
  };
}
