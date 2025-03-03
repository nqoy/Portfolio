import { GITHUB_GRAPHQL_API_URL, GITHUB_TOKEN } from "../../public/config.ts";
import { QueryBuilder } from "../classes/graphql/queryBuilder.ts";
import { GitHubQuery } from "../classes/gitHubQuery.ts";

export const FetchGitHubData = async (gitHubQuery: GitHubQuery) => {
  const query = QueryBuilder.buildQuery(gitHubQuery);

  const response = await fetch(GITHUB_GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
};
