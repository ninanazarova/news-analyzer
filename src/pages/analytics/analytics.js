import "./analytics.css";

import { DataStorage } from "../../js/modules/DataStorage.js";
import { Statistics } from "../../js/components/Statistics.js";

const queryWordNode = document.querySelector(".query__word");
const totalSumNode = document.querySelector(".query__total_sum");
const mentionsSumNode = document.querySelector(".query__mentions_sum");
const monthNode = document.querySelector(".graph__month");

const dateNodes = document.querySelectorAll(".graph__date");
const mentionsNodes = document.querySelectorAll(".graph__bar");

const searchStorage = new DataStorage();
const statistics = new Statistics({
  querystring: searchStorage.getQueryString(),
  newsObject: searchStorage.getNews(),
});

statistics.updateHeadingValues(
  queryWordNode,
  totalSumNode,
  mentionsSumNode,
  monthNode
);

statistics.updateGraphs(dateNodes, mentionsNodes);
