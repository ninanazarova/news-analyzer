import { DAYS_OF_NEWS } from "../constants/constants.js";

const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
const monthsInGenetive = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const monthsInNominative = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

// for api
const dateTo = new Date();
const dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - DAYS_OF_NEWS);

const numFrom = ("0" + dateFrom.getDate()).slice(-2);
const monthFrom = ("0" + (dateFrom.getMonth() + 1)).slice(-2);
const yearFrom = dateFrom.getFullYear();

const numTo = ("0" + dateTo.getDate()).slice(-2);
const monthTo = ("0" + (dateTo.getMonth() + 1)).slice(-2);
const yearTo = dateTo.getFullYear();

export const normalizedFrom = `${yearFrom}-${monthFrom}-${numFrom}`;
export const normalizedTo = `${yearTo}-${monthTo}-${numTo}`;

//for news cards
export const parseCardDate = (date) => {
  const parsedDate = new Date(Date.parse(date));
  const num = parsedDate.getDate();
  const month = monthsInGenetive[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  return `${num} ${month}, ${year}`;
};

// for analytics
export const getDatesList = () => {
  const datesList = [];
  for (let i = DAYS_OF_NEWS; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    datesList.push([day.getDate(), ` ${days[day.getDay()]}`]);
  }
  return datesList;
};

export const getMentionsObject = () => {
  const datesList = [];
  for (let i = DAYS_OF_NEWS; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    datesList.push(day.getDate());
  }

  return datesList.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});
};

export const getCurrentMonth = () => {
  return monthsInNominative[dateTo.getMonth()];
};
