import "./index.css";
import { NewsApi } from "../../js/modules/NewsApi.js";
import { NewsCard } from "../../js/components/NewsCard.js";
import { NewsCardList } from "../../js/components/NewsCardList.js";
import { SearchInput } from "../../js/components/SearchInput.js";
import { DataStorage } from "../../js/modules/DataStorage.js";
import { ShowMoreButton } from "../../js/components/ShowMoreButton.js";
import { FormValidator } from "../../js/components/FormValidator.js";
import { parseCardDate } from "../../js/utils/date.js";

const loader = document.querySelector(".loader");
const notFoundNode = document.querySelector(".not-found");
const searchResultsNode = document.querySelector(".search-results");

const renderPreloader = (isLoading) => {
  isLoading ? (loader.style.display = "flex") : (loader.style.display = "none");
};

const renderNotFound = (isRender) => {
  isRender
    ? (notFoundNode.style.display = "flex")
    : (notFoundNode.style.display = "none");
};

const searchStorage = new DataStorage();
const newsApi = new NewsApi();

const newsCardList = new NewsCardList({
  section: searchResultsNode,
});

const formValidator = new FormValidator(document.forms.search);

formValidator.setEventListeners();

const onSearchSubmit = (e, form) => {
  e.preventDefault();

  renderPreloader(true);
  formValidator.disableSubmitButton();
  newsCardList.clear();

  const querystring = form.elements.input.value;

  newsApi
    .getNews(querystring)
    .then((news) => {
      if (news.totalResults === 0) {
        renderNotFound(true);
      } else {
        renderNotFound(false);
        searchStorage.update(querystring, news);
        cardsChunkRendering(0);
      }
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      renderPreloader(false);
      formValidator.enableSubmitButton();
    });
};

const searchInput = new SearchInput({
  node: document.forms.search,
  onSearchSubmit: onSearchSubmit,
});

searchInput.setSubmitListener();

const newCard = (cardObj) => {
  const card = new NewsCard(
    document.querySelector("#news-card").content,
    cardObj
  );
  return card.create();
};

// chunkNumber = clickCount
const cardsChunkRendering = (clickCount) => {
  searchStorage.getChunk(clickCount).forEach((newsItem) => {
    const newsCard = newCard({
      link: newsItem.url,
      image: newsItem.urlToImage,
      date: parseCardDate(newsItem.publishedAt),
      title: newsItem.title,
      description: newsItem.description,
      source: newsItem.source.name,
    });
    newsCardList.addCard(newsCard);
  });
};

const showMoreBtn = new ShowMoreButton({
  button: document.querySelector(".search-results__button"),
  onClick: cardsChunkRendering,
});

showMoreBtn.setClickListener(searchStorage);

(() => {
  if (searchStorage.getQueryString()) {
    cardsChunkRendering(0);
    document.forms.search.elements.input.value = searchStorage.getQueryString();
  }
})();
