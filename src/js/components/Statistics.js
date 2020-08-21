import {
  getDatesList,
  getMentionsObject,
  getCurrentMonth,
} from "../utils/date.js";

export class Statistics {
  constructor({ querystring, newsObject }) {
    this._querystring = querystring;
    this._newsObject = newsObject;

    this._datesList = getDatesList();
    this._mentionsObject = getMentionsObject();
    this._currentMonth = getCurrentMonth();
  }

  updateHeadingValues = (
    queryWordNode,
    totalSumNode,
    mentionsSumNode,
    monthNode
  ) => {
    queryWordNode.textContent = this._querystring;
    totalSumNode.textContent = this._newsObject.totalResults;
    mentionsSumNode.textContent = this.countTitleMentions(
      this._newsObject.articles
    );
    monthNode.textContent = `(${this._currentMonth})`;
  };

  countTitleMentions = (newsArray) => {
    return newsArray.reduce((acc, news) => {
      if (
        news.title
          .toLowerCase()
          .split(" ")
          .includes(this._querystring.toLowerCase())
      ) {
        return ++acc;
      }
      return (acc += 0);
    }, 0);
  };

  updateGraphs = (dateNodes, mentionsNodes) => {
    dateNodes.forEach((node, i) => {
      node.textContent = this._datesList[i];
    });

    this._sortMentionsByDays();

    mentionsNodes.forEach((node, i) => {
      node.setAttribute(
        "style",
        `width: ${this._mentionsObject[this._datesList[i][0]]}%;`
      );
      node.children.amount.textContent = this._mentionsObject[
        this._datesList[i][0]
      ];
      if (this._mentionsObject[this._datesList[i][0]] <= 1) {
        node.children.amount.style.color = "#b6bcbf";
      }
    });
  };

  _sortMentionsByDays = () => {
    this._newsObject.articles.forEach((article) => {
      this._mentionsObject[article.publishedAt.split("T")[0].slice(-2)] += 1;
    });
  };
}
