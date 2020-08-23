import { GITHUB_API_URL } from "../constants/constants.js";

export class GithubApi {
  getCommits = () => {
    return fetch(
      `${GITHUB_API_URL}/repos/ninanazarova/news-analyzer/commits`
    ).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    });
  };
}
