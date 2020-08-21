import "./index.css";
// TODO: Refactoring
import { NewsApi } from "../../js/modules/NewsApi.js";
import { NewsCard } from "../../js/components/NewsCard.js";
import { NewsCardList } from "../../js/components/NewsCardList.js";
import { SearchInput } from "../../js/components/SearchInput.js";
import { DataStorage } from "../../js/modules/DataStorage.js";
import { ShowMoreButton } from "../../js/components/ShowMoreButton.js";
import { parseCardDate } from "../../js/utils/date.js";

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

const searchResultsNode = document.querySelector(".search-results");
const searchStorage = new DataStorage();
const newsApi = new NewsApi();

const newsCardList = new NewsCardList({
  section: searchResultsNode,
});

const onSearchSubmit = (e, form) => {
  e.preventDefault();
  renderPreloader(true);
  searchResultsNode.setAttribute("style", "display:none");
  const querystring = form.elements.input.value;
  newsApi
    .getNews(querystring)
    .then((news) => {
      searchStorage.update(querystring, news);
      cardsChunkRendering(0);
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
  onSearchSubmit: onSearchSubmit,
});

searchInput.setSubmitListener();

// chunkNumber = clickCount
const cardsChunkRendering = (clickCount) => {
  switch (clickCount) {
    case 0:
      newsCardList.clear();
      break;
  }

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

showMoreBtn.setClickListener();

(() => {
  if (searchStorage.getQueryString()) {
    cardsChunkRendering(0);
    document.forms.search.elements.input.value = searchStorage.getQueryString();
  }
})();
