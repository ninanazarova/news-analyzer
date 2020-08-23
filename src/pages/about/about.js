import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "./about.css";
import { GithubApi } from "../../js/modules/GithubApi.js";
import { CommmitCard } from "../../js/components/CommitCard.js";
import { CommitCardList } from "../../js/components/CommitCardList.js";
import { parseCardDate } from "../../js/utils/date.js";

const commitCardList = new CommitCardList({
  cardlist: document.querySelector(".swiper-wrapper"),
});

Swiper.use([Navigation, Pagination]);
const mySwiper = new Swiper(".swiper-container", {
  init: false,
  slidesPerView: "auto",
  direction: "horizontal",
  effect: "slide",
  loop: true,
  grabCursor: true,
  centeredSlides: true,

  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    bulletClass: "commits__bullet",
    bulletActiveClass: "commits__bullet_active",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    320: {
      spaceBetween: 8,
      centeredSlides: true,
    },
    768: {
      spaceBetween: 8,
      centeredSlides: false,
    },
    1024: {
      centeredSlides: true,
      spaceBetween: 16,
    },
  },
});

const githubApi = new GithubApi();

githubApi
  .getCommits()
  .then((commits) => {
    commits = commits.length > 20 ? commits.slice(-20) : commits;
    commits
      .map((commitItem) => {
        return newCard({
          link: commitItem.html_url,
          name: commitItem.commit.committer.name,
          email: commitItem.commit.committer.email,
          date: parseCardDate(commitItem.commit.committer.date),
          message: commitItem.commit.message,
          userPic: commitItem.author.avatar_url,
        });
      })
      .forEach((card) => commitCardList.addCard(card));

    mySwiper.init();
  })
  .catch((err) => {
    alert(err);
  });

const newCard = (cardObj) => {
  const card = new CommmitCard(
    document.querySelector("#commit-card").content,
    cardObj
  );
  return card.create();
};
