import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
import "swiper/swiper-bundle.css";
import "./about.css";

const mySwiper = new Swiper(".swiper-container", {
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
      slidesPerView: "auto",
      spaceBetween: 8,
      centeredSlides: true,
      loop: false,
    },
    450: {
      slidesPerView: "auto",
      spaceBetween: 8,
      centeredSlides: true,
      loop: true,
    },
    500: {
      loop: true,
      spaceBetween: 8,
      slidesPerView: "auto",
      centeredSlides: true,
    },
    640: {
      slidesPerView: "auto",
      spaceBetween: 8,
      centeredSlides: true,
      loop: true,
    },
    767: {
      slidesPerView: "auto",
      spaceBetween: 8,
      centeredSlides: false,
      loop: false,
    },
    1024: {
      slidesPerView: "auto",
      spaceBetween: 16,
      centeredSlides: true,
    },
  },
});
