import "./index.css";
// TODO: Refactoring
import { NewsApi } from "../../js/modules/NewsApi.js";
import { NewsCard } from "../../js/components/NewsCard.js";
import { NewsCardList } from "../../js/components/NewsCardList.js";
import { SearchInput } from "../../js/components/SearchInput.js";
import { DataStorage } from "../../js/modules/DataStorage.js";

const renderPreloader = (isLoading) => {
  if (isLoading) {
    const leadSection = document.querySelector(".lead-section");
    const loader = document
      .querySelector("#search-status-loader")
      .content.cloneNode(true);

    leadSection.after(loader);
  } else {
    document.querySelector(".search-status").remove();
  }
};

const dataStore = new DataStorage();

const newsApi = new NewsApi({
  baseUrl: "https://newsapi.org/v2/everything",
  apiKey: "112ced9bd7d9458eaf112188f4d6c94c",
});

const newsCardList = new NewsCardList({
  section: document.querySelector(".search-results"),
});

const onSubmit = (e, form) => {
  e.preventDefault();
  renderPreloader(true);

  const querystring = form.elements.input.value;
  newsApi
    .getNews(querystring)
    .then((news) => {
      dataStore.updateStorage(querystring, news.articles);
      cardsChunkRendering({ e: e });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderPreloader(false);
    });
};

const newCard = (cardObj) => {
  const card = new NewsCard(
    document.querySelector("#news-card").content,
    cardObj
  );
  return card.create();
};

const searchInput = new SearchInput({
  node: document.forms.search,
  onSubmit: onSubmit,
});

searchInput.setSubmitListener();

const showMoreBtn = document.querySelector(".search-results__button");
let clickCounter = 0;
showMoreBtn.addEventListener("click", (e) => {
  ++clickCounter;
  cardsChunkRendering({ e: e, clickCounter: clickCounter });
});

const newsToChunksList = () => {
  const news = JSON.parse(localStorage.getItem("news"));

  const chunkSize = 3;
  let chunksArray = [];
  for (let i = 0; i < Math.ceil(news.length / chunkSize); i++) {
    chunksArray[i] = news.slice(i * chunkSize, i * chunkSize + chunkSize);
  }
  return chunksArray;
};

const newsList = [];

const cardsChunkRendering = ({
  e: e,
  clickCounter: clickCounter,
  isRefreshPage: isRefreshPage,
}) => {
  const chunksArray = newsToChunksList();

  if ((e && e.type === "submit") || isRefreshPage) {
    newsCardList.clear(newsList);
    chunksArray[0].forEach((newsItem) => {
      const newsCard = newCard({
        link: newsItem.url,
        image: newsItem.urlToImage,
        date: newsItem.publishedAt,
        title: newsItem.title,
        description: newsItem.description,
        source: newsItem.source.name,
      });
      newsList.push(newsCard);
      newsCardList.render(newsList);
    });
  }

  if (e && e.type === "click") {
    chunksArray[clickCounter].forEach((newsItem) => {
      const newsCard = newCard({
        link: newsItem.url,
        image: newsItem.urlToImage,
        date: newsItem.publishedAt,
        title: newsItem.title,
        description: newsItem.description,
        source: newsItem.source.name,
      });
      newsList.push(newsCard);
      newsCardList.render(newsList);
    });
  }
};

(() => {
  if (localStorage["querystring"]) {
    cardsChunkRendering({ isRefreshPage: true });
    document.forms.search.elements.input.value = localStorage["querystring"];
  }
})();
