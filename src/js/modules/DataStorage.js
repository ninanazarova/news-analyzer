export class DataStorage {
  updateStorage = (querystring, data) => {
    localStorage.setItem("querystring", querystring);
    localStorage.setItem("news", JSON.stringify(data));
  };
}
