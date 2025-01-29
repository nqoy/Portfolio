
import { GitHubQuery } from './githubQuery';

export class QueryBuilder {
  static buildQuery(gitHubQuery: GitHubQuery): string {
    const fields = gitHubQuery.getFields();
    const sortOrder = gitHubQuery.getSortOrder();

    // Construct the query based on the data
    return `
      query {
        viewer {
          repositories(first: 10, orderBy: {field: STARGAZERS, direction: ${sortOrder}}) {
            edges {
              node {
                ${fields.map((field) => field).join("\n")}
              }
            }
          }
        }
      }
    `;
  }
}
