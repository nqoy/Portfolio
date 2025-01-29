import { GitHubQuery } from "./gitHubQuery";
import { GitHubQueryField } from './queryEnums';

const fieldMappings = {
  [GitHubQueryField.URL]: "url",
  [GitHubQueryField.NAME]: "name",
  [GitHubQueryField.DESCRIPTION]: "description",
  [GitHubQueryField.FORKS_COUNT]: "forksCount",
  [GitHubQueryField.CREATED_AT]: "createdAt",
  [GitHubQueryField.UPDATED_AT]: "updatedAt",
  [GitHubQueryField.OWNER]: "owner { login }",
  [GitHubQueryField.IS_PRIVATE]: "isPrivate",
  [GitHubQueryField.LICENSE]: "license { name }",
  [GitHubQueryField.PARENT]: "parent { name }",
  [GitHubQueryField.OPEN_ISSUES]: "openIssues",
  [GitHubQueryField.STARGAZERS_COUNT]: "stargazersCount",
  [GitHubQueryField.LANGUAGE]: "primaryLanguage { name }",
};

export class QueryBuilder {
  static buildQuery(gitHubQuery: GitHubQuery): string {
    const fields = gitHubQuery.getFields();
    const selectedFields = fields
      .map((field) => fieldMappings[field])
      .filter(Boolean)
      .join("\n");

    const orderByField = gitHubQuery.getOrderByKey();
    const orderByArgument = orderByField
      ? `, orderBy: { field: ${orderByField}, direction: ${gitHubQuery.getSortOrder()} }`
      : '';
    return `
      query {
        viewer {
          repositories(first: 100 ${orderByArgument}) {
            edges {
              node {
                ${selectedFields}
              }
            }
          }
        }
      }
    `;
  }
}