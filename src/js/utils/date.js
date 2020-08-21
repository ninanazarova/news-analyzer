import { DAYS_OF_NEWS } from "../constants/constants.js";

// for api
let dateTo = new Date();
let dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - DAYS_OF_NEWS);

let numFrom = ("0" + dateFrom.getDate()).slice(-2);
let monthFrom = ("0" + (dateFrom.getMonth() + 1)).slice(-2);
let yearFrom = dateFrom.getFullYear();

let numTo = ("0" + dateTo.getDate()).slice(-2);
let monthTo = ("0" + (dateTo.getMonth() + 1)).slice(-2);
let yearTo = dateTo.getFullYear();

export let normalizedFrom = `${yearFrom}-${monthFrom}-${numFrom}`;
export let normalizedTo = `${yearTo}-${monthTo}-${numTo}`;

//for news cards

export const parseCardDate = (date) => {
  let parsedDate = new Date(Date.parse(date));
  let num = parsedDate.getDate();
  let month = monthsInGenetive[parsedDate.getMonth()];
  let year = parsedDate.getFullYear();

  return `${num} ${month}, ${year}`;
};

// for analytics
// TODO: переделать на массивы
const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export const getDatesList = () => {
  let datesList = [];
  for (let i = DAYS_OF_NEWS; i >= 0; i--) {
    let day = new Date();
    day.setDate(day.getDate() - i);
    datesList.push([day.getDate(), ` ${days[day.getDay()]}`]);
  }
  return datesList;
};

export const getMentionsObject = () => {
  let datesList = [];
  for (let i = DAYS_OF_NEWS; i >= 0; i--) {
    let day = new Date();
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

export const monthsInNominative = [
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
