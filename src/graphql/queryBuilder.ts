import { GitHubQuery } from "./gitHubQuery";
import { GitHubQueryField } from './queryEnums';

const fieldMappings = {
  [GitHubQueryField.NAME]: "name",
  [GitHubQueryField.DESCRIPTION]: "description",
  [GitHubQueryField.STARGAZERS_COUNT]: "stargazersCount",
  [GitHubQueryField.FORKS_COUNT]: "forksCount",
  [GitHubQueryField.LANGUAGE]: "primaryLanguage { name }",
  [GitHubQueryField.CREATED_AT]: "createdAt",
  [GitHubQueryField.UPDATED_AT]: "updatedAt",
  [GitHubQueryField.OWNER]: "owner { login }",
  [GitHubQueryField.IS_PRIVATE]: "isPrivate",
  [GitHubQueryField.LICENSE]: "license { name }",
  [GitHubQueryField.PARENT]: "parent { name }",
  [GitHubQueryField.URL]: "url",
  [GitHubQueryField.OPEN_ISSUES]: "openIssues",
};

export class QueryBuilder {
  static buildQuery(gitHubQuery: GitHubQuery): string {
    const fields = gitHubQuery.getFields();
    const selectedFields = fields
      .map((field) => fieldMappings[field])
      .filter(Boolean)
      .join("\n");

    const orderByField = gitHubQuery.getOrderByKeyValue();
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